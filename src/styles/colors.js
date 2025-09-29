/**
 * Color palette for the Todo App
 * Centralized color management for consistent theming
 * Supports both light and dark themes
 */

/*export const Colors = {
  // Primary brand colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA3FF',

  // Secondary colors
  secondary: '#34C759',
  accent: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',

  // Neutral colors - Light theme
  light: {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    card: '#FFFFFF',
    border: '#E5E5EA',
    borderLight: '#F2F2F7',
    text: {
      primary: '#1C1C1E',
      secondary: '#3A3A3C',
      tertiary: '#8E8E93',
      disabled: '#C7C7CC',
    },
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },

  // Neutral colors - Dark theme
  dark: {
    background: '#000000',
    surface: '#1C1C1E',
    card: '#2C2C2E',
    border: '#38383A',
    borderLight: '#48484A',
    text: {
      primary: '#FFFFFF',
      secondary: '#EBEBF5',
      tertiary: '#8E8E93',
      disabled: '#636366',
    },
    shadow: 'rgba(0, 0, 0, 0.3)',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // Status colors
  online: '#34C759',
  offline: '#8E8E93',
  typing: '#FF9500',

  // Todo status colors
  todoStatus: {
    pending: '#FF9500',
    completed: '#34C759',
    overdue: '#FF3B30',
  },
};

// Legacy colors for backward compatibility
export const colors = {
  // Primary colors
  primary: Colors.primary,
  primaryDark: Colors.primaryDark,
  primaryLight: Colors.primaryLight,

  // Secondary colors
  secondary: Colors.secondary,
  secondaryDark: '#28A745',
  secondaryLight: '#5CDB7A',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Status colors
  success: Colors.success,
  warning: Colors.warning,
  error: Colors.accent,
  info: Colors.primary,

  // Background colors
  background: Colors.light.background,
  backgroundSecondary: Colors.light.surface,
  backgroundTertiary: '#F3F4F6',

  // Text colors
  textPrimary: Colors.light.text.primary,
  textSecondary: Colors.light.text.secondary,
  textTertiary: Colors.light.text.tertiary,
  textInverse: '#FFFFFF',

  // Border colors
  border: Colors.light.border,
  borderLight: Colors.light.borderLight,
  borderDark: '#D1D5DB',

  // Shadow colors
  shadow: Colors.light.shadow,
  shadowDark: 'rgba(0, 0, 0, 0.2)',

  // Overlay colors
  overlay: Colors.light.overlay,
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

// Theme-aware color getter
export const getThemeColors = (isDark) => isDark ? Colors.dark : Colors.light;

export default colors;*/

/**
 * Color palette for the Todo App
 * Centralized color management for consistent theming
 * Supports both light and dark themes
 * Includes multiple brand color schemes (blueTheme, greenTheme)
 */

/**
 * Color palette for the Todo App
 * Centralized color management for consistent theming
 * Supports both light and dark modes
 */

export const Colors = {
  // Primary brand colors
  primary: '#2ECC71',
  primaryDark: '#27AE60',
  primaryLight: '#6FCF97',

  // Secondary colors
  secondary: '#3498DB',
  accent: '#E74C3C',
  success: '#2ECC71',
  warning: '#F1C40F',

  // Neutral colors - Light theme
  light: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    border: '#E0E0E0',
    borderLight: '#F5F5F5',
    text: {
      primary: '#2C3E50',
      secondary: '#7F8C8D',
      tertiary: '#95A5A6',
      disabled: '#BDC3C7',
    },
    shadow: 'rgba(0, 0, 0, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.25)',
  },

  // Neutral colors - Dark theme
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    card: '#2C2C2C',
    border: '#2C2C2C',
    borderLight: '#3A3A3A',
    text: {
      primary: '#ECF0F1',
      secondary: '#BDC3C7',
      tertiary: '#95A5A6',
      disabled: '#7F8C8D',
    },
    shadow: 'rgba(0, 0, 0, 0.25)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Todo status colors
  todoStatus: {
    pending: '#F1C40F',
    completed: '#2ECC71',
    overdue: '#E74C3C',
  },
};

// Legacy colors for backward compatibility
export const colors = {
  // Primary colors
  primary: Colors.primary,
  primaryDark: Colors.primaryDark,
  primaryLight: Colors.primaryLight,

  // Secondary colors
  secondary: Colors.secondary,
  secondaryDark: '#2980B9',
  secondaryLight: '#5DADE2',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Status colors
  success: Colors.success,
  warning: Colors.warning,
  error: Colors.accent,
  info: Colors.secondary,

  // Background colors
  background: Colors.light.background,
  backgroundSecondary: Colors.light.surface,
  backgroundTertiary: '#F3F4F6',

  // Text colors
  textPrimary: Colors.light.text.primary,
  textSecondary: Colors.light.text.secondary,
  textTertiary: Colors.light.text.tertiary,
  textInverse: '#FFFFFF',

  // Border colors
  border: Colors.light.border,
  borderLight: Colors.light.borderLight,
  borderDark: '#D1D5DB',

  // Shadow colors
  shadow: Colors.light.shadow,
  shadowDark: 'rgba(0, 0, 0, 0.2)',

  // Overlay colors
  overlay: Colors.light.overlay,
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

// Theme-aware color getter
export const getThemeColors = (isDark) =>
  isDark ? Colors.dark : Colors.light;

export default colors;
