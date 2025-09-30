import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTodo,
  updateTodoApi,
  deleteTodoApi,
  optimisticUpdateTodo,
  optimisticDeleteTodo,
} from '../features/todos/slices/todosSlice';

/**
 * Custom hook for optimistic todo operations
 */
export const useOptimisticTodos = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  const createTodoOptimistic = useCallback(async (todoData) => {
    try {
      const result = await dispatch(createTodo(todoData)).unwrap();
      return result;
    } catch (error) {
      console.log('Create todo failed silently:', error.message);
      // dispatch(rollbackOptimisticUpdate({
      //   operation: 'create',
      //   originalData: optimisticTodo
      // }));
      // throw error;
    }
  }, [dispatch]);

  const updateTodoOptimistic = useCallback(async (id, updates) => {

    // Immediate UI update
    dispatch(optimisticUpdateTodo({ id, updates }));

    try {
      const result = await dispatch(updateTodoApi({ id, todoData: updates })).unwrap();
      return result;
    } catch (error) {
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

  const deleteTodoOptimistic = useCallback(async (id) => {
    // Immediate UI update
    dispatch(optimisticDeleteTodo(id));

    try {
      const result = await dispatch(deleteTodoApi(id)).unwrap();
      return result;
    } catch (error) {
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

  const toggleTodoOptimistic = useCallback(async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const updates = {...todo, completed: !todo.completed };
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
