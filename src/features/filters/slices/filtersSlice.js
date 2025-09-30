import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_FILTERS } from '../../../utils';

const initialState = {
  searchQuery: DEFAULT_FILTERS.searchQuery,
  filterBy: DEFAULT_FILTERS.filterBy,
  dateFilter: DEFAULT_FILTERS.dateFilter,
  timeFilter: DEFAULT_FILTERS.timeFilter,
  customDateRange: DEFAULT_FILTERS.customDateRange,
  customTimeRange: DEFAULT_FILTERS.customTimeRange,
  sortBy: DEFAULT_FILTERS.sortBy,
  sortOrder: DEFAULT_FILTERS.sortOrder,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // Search todos by query
    searchTodos: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Filter todos by status
    filterTodos: (state, action) => {
      state.filterBy = action.payload;
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
    clearAllFilters: (state) => {
      state.searchQuery = DEFAULT_FILTERS.searchQuery;
      state.filterBy = DEFAULT_FILTERS.filterBy;
      state.dateFilter = DEFAULT_FILTERS.dateFilter;
      state.timeFilter = DEFAULT_FILTERS.timeFilter;
      state.customDateRange = DEFAULT_FILTERS.customDateRange;
      state.customTimeRange = DEFAULT_FILTERS.customTimeRange;
      state.sortBy = DEFAULT_FILTERS.sortBy;
      state.sortOrder = DEFAULT_FILTERS.sortOrder;
    },

    // Reset filters to default
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const {
  searchTodos,
  filterTodos,
  filterByDate,
  filterByTime,
  setCustomDateRange,
  setCustomTimeRange,
  sortByTime,
  clearAllFilters,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
