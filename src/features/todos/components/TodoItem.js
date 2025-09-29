import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { format, parseISO } from 'date-fns';
import { colors, responsive, Shadows } from '../../../utils';
import { useOptimisticTodos } from '../../../hooks/useOptimisticTodos';

/**
 * TodoItem component for displaying individual todo items
 * Handles toggle completion and delete actions
 */
const TodoItem = ({ todo, onPress }) => {
  const { toggleTodoOptimistic, deleteTodoOptimistic } = useOptimisticTodos();

  const handleToggle = async () => {
    try {
      await toggleTodoOptimistic(todo.id);
      } catch (error) {
        // Silent error handling
      }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTodoOptimistic(todo.id);
              } catch (error) {
                // Silent error handling
              }
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = parseISO(dateString);
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      return '';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString;
  };

  const isOverdue = () => {
    if (!todo.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(todo.dueDate);
    return dueDate < today && !todo.completed;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        Shadows.card(),
        todo.completed && styles.container_completed,
        isOverdue() && styles.container_overdue,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                todo.completed && styles.title_completed,
              ]}
              numberOfLines={2}
            >
              {todo.name}
            </Text>

            <TouchableOpacity
              style={[
                styles.checkbox,
                todo.completed && styles.checkbox_completed,
              ]}
              onPress={handleToggle}
            >
              {todo.completed && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>

          {todo.description && (
            <Text
              style={[
                styles.description,
                todo.completed && styles.description_completed,
              ]}
              numberOfLines={3}
            >
              {todo.description}
            </Text>
          )}

          <View style={styles.footer}>
            {todo.dueDate && (
              <View style={styles.dateContainer}>
                <Text
                  style={[
                    styles.date,
                    isOverdue() && styles.date_overdue,
                    todo.completed && styles.date_completed,
                  ]}
                >
                  📅 {formatDate(todo.dueDate)}
                </Text>
              </View>
            )}

            {todo.time && (
              <View style={styles.timeContainer}>
                <Text
                  style={[
                    styles.time,
                    todo.completed && styles.time_completed,
                  ]}
                >
                  🕐 {formatTime(todo.time)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: responsive.borderRadius.md,
    marginBottom: responsive.margin.md,
  },

  container_completed: {
    opacity: 0.7,
  },

  container_overdue: {
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: responsive.padding.md,
  },

  mainContent: {
    flex: 1,
    rowGap: responsive.margin.sm,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    flex: 1,
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginRight: responsive.margin.sm,
  },

  title_completed: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },

  checkbox: {
    width: responsive.fontSize.lg * 1.5,
    height: responsive.fontSize.lg * 1.5,
    borderRadius: responsive.fontSize.lg * 0.75,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },

  checkbox_completed: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  checkmark: {
    color: colors.white,
    fontSize: responsive.fontSize.sm,
    fontWeight: 'bold',
  },

  description: {
    fontSize: responsive.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: responsive.fontSize.sm * 1.4,
  },

  description_completed: {
    color: colors.textTertiary,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  dateContainer: {
    marginRight: responsive.margin.md,
    marginBottom: responsive.margin.xs,
  },

  date: {
    fontSize: responsive.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  date_overdue: {
    color: colors.error,
    fontWeight: '600',
  },

  date_completed: {
    color: colors.textTertiary,
  },

  timeContainer: {
    marginBottom: responsive.margin.xs,
  },

  time: {
    fontSize: responsive.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '500',
  },

  time_completed: {
    color: colors.textTertiary,
  },

  deleteButton: {
    padding: responsive.padding.xs,
    marginLeft: responsive.margin.sm,
  },

  deleteText: {
    fontSize: responsive.fontSize.md,
  },
});

export default TodoItem;
