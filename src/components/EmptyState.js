import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, responsive } from '../utils';

/**
 * EmptyState component for displaying when there's no data
 * Supports different states and actions
 */
const EmptyState = ({
  title,
  description,
  icon,
  actionTitle,
  onActionPress,
  style,
  titleStyle,
  descriptionStyle,
  actionStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
      
      <Text style={[styles.title, { color: colors.textPrimary }, titleStyle]}>
        {title}
      </Text>
      
      {description && (
        <Text style={[styles.description, { color: colors.textSecondary }, descriptionStyle]}>
          {description}
        </Text>
      )}
      
      {actionTitle && onActionPress && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.primary }, actionStyle]}
          onPress={onActionPress}
          activeOpacity={0.8}
        >
          <Text style={styles.actionText}>
            {actionTitle}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsive.padding.xl,
    paddingVertical: responsive.padding.xl,
  },
  
  iconContainer: {
    marginBottom: responsive.margin.lg,
    opacity: 0.6,
  },
  
  title: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: responsive.margin.sm,
  },
  
  description: {
    fontSize: responsive.fontSize.md,
    textAlign: 'center',
    lineHeight: responsive.fontSize.md * 1.4,
    marginBottom: responsive.margin.xl,
  },
  
  actionButton: {
    paddingHorizontal: responsive.padding.lg,
    paddingVertical: responsive.padding.md,
    borderRadius: responsive.borderRadius.md,
  },
  
  actionText: {
    color: colors.white,
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
  },
});

export default EmptyState;
