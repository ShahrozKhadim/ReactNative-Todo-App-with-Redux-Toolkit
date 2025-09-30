import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { format } from 'date-fns';
import { colors, responsive } from '../utils';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * DatePicker component for selecting dates
 * Uses @react-native-community/datetimepicker for native date selection
 */
const DatePicker = ({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  error,
  disabled = false,
  minimumDate,
  maximumDate,
  style,
  labelStyle,
  errorStyle,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android' && event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }

    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const handlePress = () => {
    if (!disabled) {
      setShowPicker(true);
    }
  };

  const handleCancel = () => {
    setShowPicker(false);
    setSelectedDate(null);
  };

  const handleDone = () => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      onChange(formattedDate);
    }
    setShowPicker(false);
    setSelectedDate(null);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
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
          {value ? formatDisplayDate(value) : placeholder}
        </Text>

        <Text style={styles.icon}>📅</Text>
      </TouchableOpacity>

      {error && (
        <Text style={[styles.error, { color: colors.error }, errorStyle]}>
          {error}
        </Text>
      )}

      {showPicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showPicker}
          onRequestClose={handleCancel}
        >
          <TouchableWithoutFeedback onPress={handleCancel}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Select Date</Text>
                    <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
                      <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={selectedDate || (value ? new Date(value) : new Date())}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    minimumDate={minimumDate}
                    maximumDate={maximumDate}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
    paddingHorizontal: responsive.padding.md,
    minHeight: responsive.height.input,
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

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: responsive.borderRadius.lg,
    borderTopRightRadius: responsive.borderRadius.lg,
    paddingBottom: 34, // Safe area for iPhone
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.padding.lg,
    paddingVertical: responsive.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  cancelButton: {
    paddingVertical: responsive.padding.sm,
  },

  cancelText: {
    fontSize: responsive.fontSize.md,
    color: colors.primary,
    fontWeight: '500',
  },

  modalTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  doneButton: {
    paddingVertical: responsive.padding.sm,
  },

  doneText: {
    fontSize: responsive.fontSize.md,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default DatePicker;
