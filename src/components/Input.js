import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, responsive } from '../utils';

/**
 * Reusable Input component
 * Supports different variants, validation states, and icons
 */
const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = () => {
    const baseStyle = [
      styles.container,
      {
        backgroundColor: colors.white,
        borderColor: isFocused ? colors.primary : error ? colors.error : colors.border,
      }
    ];

    if (isFocused) {
      baseStyle.push(styles.container_focused);
    }

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

  const getInputStyle = () => {
    const baseInputStyle = [
      styles.input,
      {
        color: colors.textPrimary,
      }
    ];

    if (multiline) {
      baseInputStyle.push(styles.input_multiline);
    }

    if (inputStyle) {
      baseInputStyle.push(inputStyle);
    }

    return baseInputStyle;
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, { color: colors.textPrimary }, labelStyle]}>
          {label}
        </Text>
      )}

      <View style={getContainerStyle()}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}

        <TextInput
          style={getInputStyle()}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={[styles.error, { color: colors.error }, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: responsive.margin.md,
    rowGap: responsive.margin.xs,
  },

  label: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '500',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: responsive.borderRadius.md,
    paddingHorizontal: responsive.padding.md,
    minHeight: responsive.height.input,
  },

  container_focused: {
    borderWidth: 2,
  },

  container_error: {
    borderWidth: 2,
  },

  container_disabled: {
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[300],
  },

  leftIcon: {
    marginRight: responsive.margin.sm,
  },

  rightIcon: {
    marginLeft: responsive.margin.sm,
    padding: responsive.padding.xs,
  },

  input: {
    flex: 1,
    fontSize: responsive.fontSize.md,
    paddingVertical: responsive.padding.sm,
  },

  input_multiline: {
    textAlignVertical: 'top',
    minHeight: responsive.height.input * 2,
  },

  error: {
    fontSize: responsive.fontSize.xs,
    marginTop: responsive.margin.xs,
  },
});

export default Input;
