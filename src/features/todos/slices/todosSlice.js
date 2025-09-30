import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { todoApi } from '../services/todoApi';
import { DUMMY_TODOS } from '../../../data/dummyTodos';

// API async thunks with optimistic updates for better UX
const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await todoApi.fetchTodos();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todoData, { dispatch, rejectWithValue }) => {
    // Generate temporary ID for optimistic update
    const tempId = `temp_${Date.now()}`;
    try {
      const response = await todoApi.createTodo(todoData);
      const serverTodo = response.data;

      return serverTodo;
    } catch (error) {
      // Rollback optimistic update on failure
      dispatch(deleteTodo(tempId));
      return rejectWithValue(error.message);
    }
  },
);

const updateTodoApi = createAsyncThunk(
  'todos/updateTodoApi',
  async ({ id, todoData }, { dispatch, getState, rejectWithValue }) => {
    // Store original todo for rollback
    const state = getState();
    const originalTodo = state.todos.todos.find(todo => todo.id === id);

    // Optimistic update - update store immediately
    dispatch(updateTodo({ id, updates: todoData }));

    try {
      const response = await todoApi.updateTodo(id, todoData);
      const serverTodo = response.data;

      // Update with server response
      dispatch(updateTodo({ id, updates: serverTodo }));

      return serverTodo;
    } catch (error) {
      // Rollback optimistic update on failure
      if (originalTodo) {
        dispatch(updateTodo({ id, updates: originalTodo }));
      }
      return rejectWithValue(error.message);
    }
  },
);

const deleteTodoApi = createAsyncThunk(
  'todos/deleteTodoApi',
  async (id, { dispatch, getState, rejectWithValue }) => {
    // Store original todo for rollback
    const state = getState();
    const originalTodo = state.todos.todos.find(todo => todo.id === id);

    // Optimistic update - remove from store immediately
    dispatch(deleteTodo(id));

    try {
      await todoApi.deleteTodo(id);
      return id;
    } catch (error) {
      // Rollback optimistic update on failure
      if (originalTodo) {
        dispatch(addTodo(originalTodo));
      }
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  todos: [...DUMMY_TODOS],
  loading: false,
  error: null,
  sortBy: 'createdAt', // 'name', 'dueDate', 'createdAt', 'time'
  sortOrder: 'desc', // 'asc', 'desc'
  filterBy: 'all', // 'all', 'completed', 'pending'
  searchQuery: '',
  // Enhanced filtering options
  dateFilter: 'all', // 'all', 'today', 'thisWeek', 'thisMonth', 'overdue', 'custom'
  timeFilter: 'all', // 'all', 'morning', 'afternoon', 'evening', 'night', 'custom'
  customDateRange: { start: null, end: null },
  customTimeRange: { start: null, end: null },
  // Pagination state
  pagination: {
    currentPage: 0,
    pageSize: 20,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    isLoadingMore: false,
  },
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Add a new todo locally
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now().toString(),
        ...action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.todos.unshift(newTodo);
    },

    // Update a todo locally
    updateTodo: (state, action) => {
      const { id, updates } = action.payload;
      const todoIndex = state.todos.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = {
          ...state.todos[todoIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // Delete a todo locally
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },

    // Toggle todo completion status
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date().toISOString();
      }
    },

    // Sort todos
    sortTodos: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;

      state.todos.sort((a, b) => {
        let aValue, bValue;

        switch (sortBy) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'dueDate':
            aValue = new Date(a.dueDate || '9999-12-31');
            bValue = new Date(b.dueDate || '9999-12-31');
            break;
          case 'createdAt':
          default:
            aValue = new Date(a.createdAt);
            bValue = new Date(b.createdAt);
            break;
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    },

    // Filter todos
    filterTodos: (state, action) => {
      state.filterBy = action.payload;
    },

    // Search todos
    searchTodos: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Enhanced filtering
    filterByDate: (state, action) => {
      state.dateFilter = action.payload;
    },

    filterByTime: (state, action) => {
      state.timeFilter = action.payload;
    },

    setCustomDateRange: (state, action) => {
      state.customDateRange = action.payload;
    },

    setCustomTimeRange: (state, action) => {
      state.customTimeRange = action.payload;
    },

    // Enhanced sorting
    sortByTime: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },

    // Clear all filters
    clearAllFilters: state => {
      state.searchQuery = '';
      state.dateFilter = 'all';
      state.timeFilter = 'all';
      state.customDateRange = { start: null, end: null };
      state.customTimeRange = { start: null, end: null };
      state.filterBy = 'all';
      // Reset pagination when clearing filters
      if (state.pagination) {
        state.pagination.currentPage = 0;
      }
    },

    // Pagination actions
    setPageSize: (state, action) => {
      if (!state.pagination) {
        state.pagination = {
          currentPage: 0,
          pageSize: 20,
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          isLoadingMore: false,
        };
      }
      state.pagination.pageSize = action.payload;
      state.pagination.currentPage = 0; // Reset to first page
    },

    setCurrentPage: (state, action) => {
      if (!state.pagination) {
        state.pagination = {
          currentPage: 0,
          pageSize: 20,
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          isLoadingMore: false,
        };
      }
      state.pagination.currentPage = action.payload;
    },

    nextPage: state => {
      if (!state.pagination) {
        state.pagination = {
          currentPage: 0,
          pageSize: 20,
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          isLoadingMore: false,
        };
      }
      if (state.pagination.hasNextPage) {
        state.pagination.currentPage += 1;
      }
    },

    previousPage: state => {
      if (!state.pagination) {
        state.pagination = {
          currentPage: 0,
          pageSize: 20,
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          isLoadingMore: false,
        };
      }
      if (state.pagination.hasPreviousPage) {
        state.pagination.currentPage -= 1;
      }
    },

    setLoadingMore: (state, action) => {
      if (!state.pagination) {
        state.pagination = {
          currentPage: 0,
          pageSize: 20,
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          isLoadingMore: false,
        };
      }
      state.pagination.isLoadingMore = action.payload;
    },

    updatePaginationInfo: (state, action) => {
      const { totalItems, hasNextPage, hasPreviousPage } = action.payload;
      // Ensure pagination object exists
      if (!state.pagination) {
        state.pagination = {
          currentPage: 0,
          pageSize: 20,
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          isLoadingMore: false,
        };
      }
      state.pagination.totalItems = totalItems;
      state.pagination.hasNextPage = hasNextPage;
      state.pagination.hasPreviousPage = hasPreviousPage;
    },

    // Optimistic update actions
    optimisticAddTodo: (state, action) => {
      const newTodo = {
        id: action.payload.id,
        ...action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.todos.unshift(newTodo);
    },

    optimisticUpdateTodo: (state, action) => {
      const { id, updates } = action.payload;
      const todoIndex = state.todos.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = {
          ...state.todos[todoIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    optimisticDeleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },

    rollbackOptimisticUpdate: (state, action) => {
      const { operation, originalData } = action.payload;

      switch (operation) {
        case 'create':
          // Remove the optimistic todo
          state.todos = state.todos.filter(todo => todo.id !== originalData.id);
          break;
        case 'update':
          // Restore original todo
          const updateIndex = state.todos.findIndex(
            todo => todo.id === originalData.id,
          );
          if (updateIndex !== -1) {
            state.todos[updateIndex] = originalData;
          }
          break;
        case 'delete':
          // Restore deleted todo
          state.todos.unshift(originalData);
          break;
      }
    },

    // Clear error
    clearError: state => {
      state.error = null;
    },

    // Reset todos state
    resetTodos: state => {
      state.todos = [];
      state.loading = false;
      state.error = null;
      state.sortBy = 'createdAt';
      state.sortOrder = 'desc';
      state.filterBy = 'all';
      state.searchQuery = '';
      state.dateFilter = 'all';
      state.timeFilter = 'all';
      state.customDateRange = { start: null, end: null };
      state.customTimeRange = { start: null, end: null };
      // Reset pagination
      state.pagination = {
        currentPage: 0,
        pageSize: 20,
        totalItems: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        isLoadingMore: false,
      };
    },
  },
  extraReducers: builder => {
    // Fetch todos
    builder
      .addCase(fetchTodos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create todo
    builder
      .addCase(createTodo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.unshift(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update todo
    builder
      .addCase(updateTodoApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodoApi.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(
          todo => todo.id === action.payload.id,
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodoApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete todo
    builder
      .addCase(deleteTodoApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodoApi.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(deleteTodoApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  sortTodos,
  filterTodos,
  searchTodos,
  filterByDate,
  filterByTime,
  setCustomDateRange,
  setCustomTimeRange,
  sortByTime,
  clearAllFilters,
  setPageSize,
  setCurrentPage,
  nextPage,
  previousPage,
  setLoadingMore,
  updatePaginationInfo,
  optimisticAddTodo,
  optimisticUpdateTodo,
  optimisticDeleteTodo,
  rollbackOptimisticUpdate,
  clearError,
  resetTodos,
} = todosSlice.actions;

// Export API async thunks
export { fetchTodos, createTodo, updateTodoApi, deleteTodoApi };

export default todosSlice.reducer;
