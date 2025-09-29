import axios from 'axios';

// API Configuration
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Using JSONPlaceholder for demo
const API_TIMEOUT = 10000; // 10 seconds timeout

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error('Bad Request: Invalid data provided');
        case 401:
          throw new Error('Unauthorized: Please login again');
        case 403:
          throw new Error('Forbidden: Access denied');
        case 404:
          throw new Error('Not Found: Resource not found');
        case 500:
          throw new Error('Server Error: Please try again later');
        default:
          throw new Error(data?.message || `HTTP ${status}: ${error.message}`);
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network Error: Please check your connection');
    } else {
      // Other error
      throw new Error(error.message || 'Unknown Error');
    }
  }
);

// Transform todo data to match our app structure
const transformTodo = (todo) => ({
  id: todo.id.toString(),
  name: todo.title,
  description: todo.body || '',
  dueDate: todo.dueDate || null,
  time: todo.time || null,
  completed: todo.completed || false,
  createdAt: todo.createdAt || new Date().toISOString(),
  updatedAt: todo.updatedAt || new Date().toISOString(),
});

// Transform todo data for API submission
const transformTodoForApi = (todo) => ({
  title: todo.name,
  body: todo.description || '',
  dueDate: todo.dueDate,
  time: todo.time,
  completed: todo.completed || false,
});

// API Service
export const todoApi = {
  // Fetch all todos
  fetchTodos: async () => {
    try {
      const response = await apiClient.get('/posts');
      const todos = response.data.map(transformTodo);
      return { data: todos };
    } catch (error) {
      throw error;
    }
  },

  // Fetch single todo by ID
  fetchTodoById: async (id) => {
    try {
      const response = await apiClient.get(`/posts/${id}`);
      return { data: transformTodo(response.data) };
    } catch (error) {
      throw error;
    }
  },

  // Create new todo
  createTodo: async (todoData) => {
    try {
      const transformedData = transformTodoForApi(todoData);
      const response = await apiClient.post('/posts', transformedData);
      return { data: transformTodo(response.data) };
    } catch (error) {
      throw error;
    }
  },

  // Update existing todo
  updateTodo: async (id, todoData) => {
    try {
      const transformedData = transformTodoForApi(todoData);
      const response = await apiClient.put(`/posts/${id}`, transformedData);
      return { data: transformTodo(response.data) };
    } catch (error) {
      throw error;
    }
  },

  // Delete todo
  deleteTodo: async (id) => {
    try {
      await apiClient.delete(`/posts/${id}`);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  // Search todos
  searchTodos: async (query) => {
    try {
      const response = await apiClient.get('/posts', {
        params: { q: query }
      });
      const todos = response.data.map(transformTodo);
      return { data: todos };
    } catch (error) {
      throw error;
    }
  },

  // Get todos with pagination
  fetchTodosPaginated: async (page = 1, limit = 20) => {
    try {
      const response = await apiClient.get('/posts', {
        params: {
          _page: page,
          _limit: limit,
        }
      });
      const todos = response.data.map(transformTodo);
      const totalCount = response.headers['x-total-count'] || response.data.length;
      
      return {
        data: todos,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalItems: parseInt(totalCount),
          hasNextPage: page < Math.ceil(totalCount / limit),
          hasPreviousPage: page > 1,
        }
      };
    } catch (error) {
      throw error;
    }
  },
};

// Export default
export default todoApi;