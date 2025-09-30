/**
 * Constants for filter and sort options
 * Centralized configuration for consistent UI options across the app
 */

export const DATE_FILTER_OPTIONS = [
  { value: 'all', label: 'All Dates' },
  { value: 'today', label: 'Today' },
  { value: 'thisWeek', label: 'This Week' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'custom', label: 'Custom Range' },
];

export const TIME_FILTER_OPTIONS = [
  { value: 'all', label: 'All Times' },
  { value: 'morning', label: 'Morning (6AM-12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM-6PM)' },
  { value: 'evening', label: 'Evening (6PM-12AM)' },
  { value: 'night', label: 'Night (12AM-6AM)' },
  { value: 'custom', label: 'Custom Time' },
];

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'createdAt', label: 'Created Date' },
  { value: 'time', label: 'Time' },
];

export const SORT_ORDER_OPTIONS = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

// Default values
export const DEFAULT_FILTERS = {
  searchQuery: '',
  filterBy: 'all',
  dateFilter: 'all',
  timeFilter: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  customDateRange: { start: null, end: null },
  customTimeRange: { start: null, end: null },
};

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  currentPage: 0,
  pageSize: 20,
  totalItems: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  isLoadingMore: false,
};

// Time ranges for filtering
export const TIME_RANGES = {
  morning: { start: '06:00', end: '12:00' },
  afternoon: { start: '12:00', end: '18:00' },
  evening: { start: '18:00', end: '24:00' },
  night: { start: '00:00', end: '06:00' },
};

// Date ranges for filtering
export const DATE_RANGES = {
  today: 0,
  thisWeek: 7,
  thisMonth: 30,
};
