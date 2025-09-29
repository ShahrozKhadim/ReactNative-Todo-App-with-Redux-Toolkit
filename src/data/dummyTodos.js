/**
 * Dummy data for testing the React Native Todo App
 * This file contains sample todos for development and testing purposes
 */

export const DUMMY_TODOS = [
  {
    id: '1',
    name: 'Complete React Native Todo App',
    description: 'Finish implementing all features including CRUD operations, sorting, and filtering',
    dueDate: '2024-01-15',
    time: '18:00',
    completed: false,
    createdAt: '2024-01-10T10:00:00.000Z',
    updatedAt: '2024-01-10T10:00:00.000Z',
  },
  {
    id: '2',
    name: 'Review project documentation',
    description: 'Go through the README and ensure all features are properly documented',
    dueDate: '2024-01-12',
    time: '14:30',
    completed: true,
    createdAt: '2024-01-08T09:15:00.000Z',
    updatedAt: '2024-01-11T16:45:00.000Z',
  },
  {
    id: '3',
    name: 'Setup development environment',
    description: 'Install all necessary dependencies and configure the development setup',
    dueDate: '2024-01-09',
    time: '10:00',
    completed: true,
    createdAt: '2024-01-07T08:30:00.000Z',
    updatedAt: '2024-01-09T11:20:00.000Z',
  },
  {
    id: '4',
    name: 'Design user interface',
    description: 'Create wireframes and mockups for the todo app interface',
    dueDate: '2024-01-20',
    time: '16:00',
    completed: false,
    createdAt: '2024-01-11T13:20:00.000Z',
    updatedAt: '2024-01-11T13:20:00.000Z',
  },
  {
    id: '5',
    name: 'Write unit tests',
    description: 'Add comprehensive test coverage for all components and functions',
    dueDate: '2024-01-18',
    time: '11:30',
    completed: false,
    createdAt: '2024-01-12T07:45:00.000Z',
    updatedAt: '2024-01-12T07:45:00.000Z',
  },
  {
    id: '6',
    name: 'Code review session',
    description: 'Review code with team members and implement feedback',
    dueDate: '2024-01-14',
    time: '15:00',
    completed: false,
    createdAt: '2024-01-13T12:10:00.000Z',
    updatedAt: '2024-01-13T12:10:00.000Z',
  },
  {
    id: '7',
    name: 'Deploy to production',
    description: 'Deploy the completed application to production environment',
    dueDate: '2024-01-25',
    time: '09:00',
    completed: false,
    createdAt: '2024-01-14T14:30:00.000Z',
    updatedAt: '2024-01-14T14:30:00.000Z',
  },
  {
    id: '8',
    name: 'Update project dependencies',
    description: 'Check for outdated packages and update them to latest versions',
    dueDate: '2024-01-16',
    time: '13:15',
    completed: false,
    createdAt: '2024-01-15T11:00:00.000Z',
    updatedAt: '2024-01-15T11:00:00.000Z',
  },
];

/**
 * Generate a new todo with unique ID
 * @param {Object} todoData - Todo data without ID
 * @returns {Object} New todo with generated ID and timestamps
 */
export const generateNewTodo = (todoData) => {
  const now = new Date().toISOString();
  return {
    id: Date.now().toString(),
    ...todoData,
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * Simulate API delay for testing
 * @param {number} ms - Delay in milliseconds
 * @returns {Promise} Promise that resolves after delay
 */
export const simulateApiDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
