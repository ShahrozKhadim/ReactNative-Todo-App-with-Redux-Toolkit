import { Platform } from 'react-native';

/**
 * Shadow styles for consistent elevation across the app
 * Handles platform differences between iOS and Android
 */

export const Shadows = {
  // Card shadows
  card: () => ({
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  }),

  // Small elevation
  small: () => ({
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  }),

  // Medium elevation
  medium: () => ({
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  }),

  // Large elevation
  large: () => ({
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  }),

  // Button shadow
  button: () => ({
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  }),

  // Modal shadow
  modal: () => ({
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  }),

  // Floating action button shadow
  fab: () => ({
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  }),
};


// Predefined shadow levels
export const shadows = {
  none: {},
  sm: () => Shadows.small(),
  md: () => Shadows.card(),
  lg: () => Shadows.medium(),
  xl: () => Shadows.large(),
  xxl: () => Shadows.large(),
};

// Specific shadow exports
export const cardShadow = () => Shadows.card();
export const buttonShadow = () => Shadows.button();
export const modalShadow = () => Shadows.modal();
export const fabShadow = () => Shadows.fab();

export default {
  Shadows,
  shadows,
  cardShadow,
  buttonShadow,
  modalShadow,
  fabShadow,
};
