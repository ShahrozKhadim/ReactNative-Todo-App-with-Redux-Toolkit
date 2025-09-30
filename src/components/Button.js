import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { colors, responsive } from '../utils';

/**
 * Reusable Button component
 * Supports different variants, sizes, and states
 */
const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`button_${variant}`], styles[`button_${size}`]];

    if (disabled || loading) {
      baseStyle.push(styles.button_disabled);
    }

    if (style) {
      baseStyle.push(style);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle = [
      styles.text,
      styles[`text_${variant}`],
      styles[`text_${size}`],
    ];

    if (disabled || loading) {
      baseTextStyle.push(styles.text_disabled);
    }

    if (textStyle) {
      baseTextStyle.push(textStyle);
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? colors.white : colors.primary}
          />
        ) : (
          <>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={getTextStyle()}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: responsive.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  // Variants
  button_primary: {
    backgroundColor: colors.primary,
  },
  button_secondary: {
    backgroundColor: colors.secondary,
  },
  button_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  button_ghost: {
    backgroundColor: 'transparent',
  },
  button_danger: {
    backgroundColor: colors.error,
  },

  // Sizes
  button_sm: {
    paddingHorizontal: responsive.padding.md,
    paddingVertical: responsive.padding.sm,
    minHeight: responsive.height.button * 0.8,
  },
  button_md: {
    paddingHorizontal: responsive.padding.lg,
    paddingVertical: responsive.padding.md,
    minHeight: responsive.height.button,
  },
  button_lg: {
    paddingHorizontal: responsive.padding.xl,
    paddingVertical: responsive.padding.lg,
    minHeight: responsive.height.button * 1.2,
  },

  // States
  button_disabled: {
    backgroundColor: colors.gray[300],
    borderColor: colors.gray[300],
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginRight: responsive.margin.sm,
  },

  text: {
    fontWeight: '600',
    textAlign: 'center',
  },

  // Text variants
  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.white,
  },
  text_outline: {
    color: colors.primary,
  },
  text_ghost: {
    color: colors.primary,
  },
  text_danger: {
    color: colors.white,
  },

  // Text sizes
  text_sm: {
    fontSize: responsive.fontSize.sm,
  },
  text_md: {
    fontSize: responsive.fontSize.md,
  },
  text_lg: {
    fontSize: responsive.fontSize.lg,
  },

  // Text states
  text_disabled: {
    color: colors.gray[500],
  },
});

export default Button;
