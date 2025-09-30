import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useOptimisticTodos } from '../../../hooks/useOptimisticTodos';
import TodoForm from '../components/TodoForm';

/**
 * AddTodoScreen - Screen for creating new todos
 */
const AddTodoScreen = () => {
  const navigation = useNavigation();
  const { createTodoOptimistic } = useOptimisticTodos();

  const handleSubmit = async (todoData) => {
    try {
      await createTodoOptimistic(todoData);
      navigation.goBack();
    } catch (error) {
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <TodoForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isEditing={false}
    />
  );
};

export default AddTodoScreen;
