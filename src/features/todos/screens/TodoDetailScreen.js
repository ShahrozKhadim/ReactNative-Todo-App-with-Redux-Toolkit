import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { useOptimisticTodos } from '../../../hooks/useOptimisticTodos';
import Button from '../../../components/Button';
import TodoForm from '../components/TodoForm';
import { colors, responsive } from '../../../utils';

/**
 * TodoDetailScreen - Screen for viewing and editing todo details
 */
const TodoDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { updateTodoOptimistic, deleteTodoOptimistic, toggleTodoOptimistic } =
    useOptimisticTodos();

  const todos = useSelector(state => state.todos.todos);
  const [isEditing, setIsEditing] = useState(false);

  const { todo: initialTodo } = route.params;
  const currentTodo = todos.find(t => t.id === initialTodo.id) || initialTodo;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async updatedTodoData => {
    try {
      await updateTodoOptimistic(currentTodo.id, updatedTodoData?.updates);
      setIsEditing(false);

      } catch (error) {
      }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
            try {
              await deleteTodoOptimistic(currentTodo.id);
              navigation.goBack();
                } catch (error) {
                }
        },
      },
    ]);
  };

  const handleToggleComplete = async () => {
    try {
      await toggleTodoOptimistic(currentTodo.id);
      } catch (error) {
      }
  };

  const formatDate = dateString => {
    if (!dateString) return 'No due date';
    try {
      const date = parseISO(dateString);
      return format(date, 'EEEE, MMMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatTime = timeString => {
    if (!timeString) return 'No time set';
    return timeString;
  };

  const isOverdue = () => {
    if (!currentTodo.dueDate) return false;
    const today = new Date();
    const dueDate = new Date(currentTodo.dueDate);
    return dueDate < today && !currentTodo.completed;
  };

  const getStatusColor = () => {
    if (currentTodo.completed) return colors.success;
    if (isOverdue()) return colors.error;
    return colors.warning;
  };

  const getStatusText = () => {
    if (currentTodo.completed) return 'Completed';
    if (isOverdue()) return 'Overdue';
    return 'Pending';
  };

  if (isEditing) {
    return (
      <TodoForm
        todo={currentTodo}
        onSubmit={handleSave}
        onCancel={handleCancel}
        isEditing={true}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Status Header */}
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: getStatusColor() },
            ]}
          />
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>

        {/* Todo Title */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Title</Text>
          <Text
            style={[
              styles.title,
              currentTodo.completed && styles.title_completed,
            ]}
          >
            {currentTodo.name}
          </Text>
        </View>

        {/* Description */}
        {currentTodo.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{currentTodo.description}</Text>
          </View>
        )}

        {/* Due Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Due Date</Text>
          <Text style={[styles.date, isOverdue() && styles.date_overdue]}>
            📅 {formatDate(currentTodo.dueDate)}
          </Text>
        </View>

        {/* Time */}
        {currentTodo.time && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Time</Text>
            <Text style={styles.time}>🕐 {formatTime(currentTodo.time)}</Text>
          </View>
        )}

        {/* Created/Updated Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.detailText}>
            Created:{' '}
            {format(parseISO(currentTodo.createdAt), 'MMM dd, yyyy HH:mm')}
          </Text>
          {currentTodo.updatedAt !== currentTodo.createdAt && (
            <Text style={styles.detailText}>
              Updated:{' '}
              {format(parseISO(currentTodo.updatedAt), 'MMM dd, yyyy HH:mm')}
            </Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            title={
              currentTodo.completed ? 'Mark as Pending' : 'Mark as Complete'
            }
            onPress={handleToggleComplete}
            variant={currentTodo.completed ? 'outline' : 'primary'}
            style={styles.actionButton}
          />

          <Button
            title="Edit"
            onPress={handleEdit}
            variant="outline"
            style={styles.actionButton}
          />

          <Button
            title="Delete"
            onPress={handleDelete}
            variant="danger"
            style={styles.actionButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: responsive.padding.lg,
    rowGap: responsive.margin.sm,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive.padding.sm,
    borderRadius: responsive.borderRadius.md,
  },

  statusIndicator: {
    width: responsive.fontSize.sm,
    height: responsive.fontSize.sm,
    borderRadius: responsive.fontSize.sm * 0.5,
    marginRight: responsive.margin.sm,
  },

  statusText: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  section: {
    // rowGap: responsive.margin.sm,
  },

  sectionTitle: {
    fontSize: responsive.fontSize.sm,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  title: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: responsive.fontSize.xl * 1.4,
  },

  title_completed: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },

  description: {
    fontSize: responsive.fontSize.md,
    color: colors.textPrimary,
    lineHeight: responsive.fontSize.md * 1.4,
  },

  date: {
    fontSize: responsive.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '500',
  },

  date_overdue: {
    color: colors.error,
    fontWeight: '600',
  },

  time: {
    fontSize: responsive.fontSize.md,
    color: colors.textPrimary,
    fontWeight: '500',
  },

  detailText: {
    fontSize: responsive.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: responsive.margin.xs,
  },

  actions: {
    gap: responsive.margin.xs,
    marginTop: responsive.margin.md,
  },

  actionButton: {
  },
});

export default TodoDetailScreen;
