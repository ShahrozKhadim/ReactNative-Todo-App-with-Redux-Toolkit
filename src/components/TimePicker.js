import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, responsive } from '../utils';

/**
 * TimePicker component for selecting time
 * Uses @react-native-community/datetimepicker for native time selection
 */
const TimePicker = ({
  label,
  value,
  onChange,
  placeholder = 'Select time',
  error,
  disabled = false,
  style,
  labelStyle,
  errorStyle,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    setShowPicker(Platform.OS === 'ios');

    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      onChange(timeString);
    }
  };

  const handlePress = () => {
    if (!disabled) {
      setShowPicker(true);
    }
  };

  const formatDisplayTime = (timeString) => {
    if (!timeString) return '';
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));

      // Format as 12-hour time with AM/PM
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch (error) {
      return timeString;
    }
  };

  const getContainerStyle = () => {
    const baseStyle = [
      styles.container,
      {
        backgroundColor: colors.white,
        borderColor: error ? colors.error : colors.border,
      }
    ];

    if (error) {
      baseStyle.push(styles.container_error);
    }

    if (disabled) {
      baseStyle.push(styles.container_disabled);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  const getPickerValue = () => {
    if (value) {
      const [hours, minutes] = value.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date;
    }
    return new Date();
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, { color: colors.textPrimary }, labelStyle]}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        style={getContainerStyle()}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.text,
            {
              color: value ? colors.textPrimary : colors.textTertiary,
            }
          ]}
        >
          {value ? formatDisplayTime(value) : placeholder}
        </Text>

        <Text style={styles.icon}>🕐</Text>
      </TouchableOpacity>

      {error && (
        <Text style={[styles.error, { color: colors.error }, errorStyle]}>
          {error}
        </Text>
      )}

      {showPicker && (
        <DateTimePicker
          value={getPickerValue()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
          is24Hour={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: responsive.margin.md,
    rowGap: responsive.margin.xs
  },

  label: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: responsive.borderRadius.md,
    minHeight: responsive.height.input,
    paddingHorizontal: responsive.padding.md,
  },

  container_error: {
    borderWidth: 2,
  },

  container_disabled: {
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[300],
  },

  text: {
    flex: 1,
    fontSize: responsive.fontSize.md,
    paddingVertical: responsive.padding.sm,
  },

  icon: {
    fontSize: responsive.fontSize.md,
    marginLeft: responsive.margin.sm,
  },

  error: {
    fontSize: responsive.fontSize.xs,
    marginTop: responsive.margin.xs,
  },
});

export default TimePicker;
