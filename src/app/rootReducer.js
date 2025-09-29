import { combineReducers } from '@reduxjs/toolkit';

// Import feature reducers
import todosReducer from '../features/todos/slices/todosSlice';

/**
 * Root reducer that combines all feature reducers
 * This follows the feature-based architecture pattern
 */
const rootReducer = combineReducers({
  todos: todosReducer,
  // Add other feature reducers here as the app grows
  // settings: settingsReducer,
  // auth: authReducer,
});

export default rootReducer;
