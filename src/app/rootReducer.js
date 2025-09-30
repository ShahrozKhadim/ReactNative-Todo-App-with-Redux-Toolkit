import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/slices/todosSlice';
import filtersReducer from '../features/filters/slices/filtersSlice';

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
});

export default rootReducer;