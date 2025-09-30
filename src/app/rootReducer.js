import { combineReducers } from '@reduxjs/toolkit';

import todosReducer from '../features/todos/slices/todosSlice';

/**
 * Root reducer that combines all feature reducers
 */
const rootReducer = combineReducers({
  todos: todosReducer,
});

export default rootReducer;
