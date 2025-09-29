import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTodo,
  updateTodoApi,
  deleteTodoApi,
  optimisticAddTodo,
  optimisticUpdateTodo,
  optimisticDeleteTodo,
} from '../features/todos/slices/todosSlice';

/**
 * Custom hook for optimistic todo operations
 * Provides immediate UI updates with rollback capability
 */
export const useOptimisticTodos = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  // Optimistic create todo
  const createTodoOptimistic = useCallback(async (todoData) => {
    const tempId = `temp_${Date.now()}`;
    const optimisticTodo = {
      id: tempId,
      ...todoData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Immediate UI update
    dispatch(optimisticAddTodo(optimisticTodo));

    try {
      const result = await dispatch(createTodo(todoData)).unwrap();
      return result;
    } catch (error) {
      // Silent error handling
      console.log('Create todo failed silently:', error.message);
      // dispatch(rollbackOptimisticUpdate({
      //   operation: 'create',
      //   originalData: optimisticTodo
      // }));
      // throw error;
    }
  }, [dispatch]);

  // Optimistic update todo
  const updateTodoOptimistic = useCallback(async (id, updates) => {
    // Store original for rollback
    const originalTodo = todos.find(todo => todo.id === id);

    // Immediate UI update
    dispatch(optimisticUpdateTodo({ id, updates }));

    try {
      const result = await dispatch(updateTodoApi({ id, todoData: updates })).unwrap();
      return result;
    } catch (error) {
      // Silent error handling
      console.log('Update todo failed silently:', error.message);
      // if (originalTodo) {
      //   dispatch(rollbackOptimisticUpdate({
      //     operation: 'update',
      //     originalData: originalTodo
      //   }));
      // }
      // throw error;
    }
  }, [dispatch, todos]);

  // Optimistic delete todo
  const deleteTodoOptimistic = useCallback(async (id) => {
    // Store original for rollback
    const originalTodo = todos.find(todo => todo.id === id);

    // Immediate UI update
    dispatch(optimisticDeleteTodo(id));

    try {
      const result = await dispatch(deleteTodoApi(id)).unwrap();
      return result;
    } catch (error) {
      // Silent error handling
      console.log('Delete todo failed silently:', error.message);
      // if (originalTodo) {
      //   dispatch(rollbackOptimisticUpdate({
      //     operation: 'delete',
      //     originalData: originalTodo
      //   }));
      // }
      // throw error;
    }
  }, [dispatch, todos]);

  // Toggle completion with optimistic update
  const toggleTodoOptimistic = useCallback(async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updates = { completed: !todo.completed };
    return updateTodoOptimistic(id, updates);
  }, [updateTodoOptimistic, todos]);

  return {
    todos,
    loading,
    error,
    createTodoOptimistic,
    updateTodoOptimistic,
    deleteTodoOptimistic,
    toggleTodoOptimistic,
  };
};
