import {
  isAfter,
  isBefore,
  parseISO,
  isToday,
  isThisWeek,
  isThisMonth,
  isPast
} from 'date-fns';

/**
 * Advanced filtering utilities for todos
 * Handles complex filtering logic for dates, times, and text search
 */

/**
 * Filter todos by text search (name and description)
 */
export const filterBySearch = (todos, searchQuery) => {
  if (!searchQuery.trim()) return todos;

  const query = searchQuery.toLowerCase();
  return todos.filter(todo =>
    todo.name.toLowerCase().includes(query) ||
    (todo.description && todo.description.toLowerCase().includes(query))
  );
};

/**
 * Filter todos by date range
 */
export const filterByDate = (todos, dateFilter, customDateRange) => {
  if (dateFilter === 'all') return todos;

  const today = new Date();

  switch (dateFilter) {
    case 'today':
      return todos.filter(todo => {
        if (!todo.dueDate) return false;
        const todoDate = parseISO(todo.dueDate);
        return isToday(todoDate);
      });

    case 'thisWeek':
      return todos.filter(todo => {
        if (!todo.dueDate) return false;
        const todoDate = parseISO(todo.dueDate);
        return isThisWeek(todoDate);
      });

    case 'thisMonth':
      return todos.filter(todo => {
        if (!todo.dueDate) return false;
        const todoDate = parseISO(todo.dueDate);
        return isThisMonth(todoDate);
      });

    case 'overdue':
      return todos.filter(todo => {
        if (!todo.dueDate || todo.completed) return false;
        const todoDate = parseISO(todo.dueDate);
        return isPast(todoDate);
      });

    case 'custom':
      if (!customDateRange.start || !customDateRange.end) return todos;
      return todos.filter(todo => {
        if (!todo.dueDate) return false;
        const todoDate = parseISO(todo.dueDate);
        const startDate = parseISO(customDateRange.start);
        const endDate = parseISO(customDateRange.end);
        return isAfter(todoDate, startDate) && isBefore(todoDate, endDate);
      });

    default:
      return todos;
  }
};

/**
 * Filter todos by time range
 */
export const filterByTime = (todos, timeFilter, customTimeRange) => {
  if (timeFilter === 'all') return todos;

  const getTimeInMinutes = (timeString) => {
    if (!timeString) return 0;
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  switch (timeFilter) {
    case 'morning':
      return todos.filter(todo => {
        if (!todo.time) return false;
        const timeInMinutes = getTimeInMinutes(todo.time);
        return timeInMinutes >= 360 && timeInMinutes < 720; // 6AM-12PM
      });

    case 'afternoon':
      return todos.filter(todo => {
        if (!todo.time) return false;
        const timeInMinutes = getTimeInMinutes(todo.time);
        return timeInMinutes >= 720 && timeInMinutes < 1080; // 12PM-6PM
      });

    case 'evening':
      return todos.filter(todo => {
        if (!todo.time) return false;
        const timeInMinutes = getTimeInMinutes(todo.time);
        return timeInMinutes >= 1080 && timeInMinutes < 1440; // 6PM-12AM
      });

    case 'night':
      return todos.filter(todo => {
        if (!todo.time) return false;
        const timeInMinutes = getTimeInMinutes(todo.time);
        return timeInMinutes >= 0 && timeInMinutes < 360; // 12AM-6AM
      });

    case 'custom':
      if (!customTimeRange.start || !customTimeRange.end) return todos;
      return todos.filter(todo => {
        if (!todo.time) return false;
        const todoTime = getTimeInMinutes(todo.time);
        const startTime = getTimeInMinutes(customTimeRange.start);
        const endTime = getTimeInMinutes(customTimeRange.end);
        return todoTime >= startTime && todoTime <= endTime;
      });

    default:
      return todos;
  }
};

/**
 * Filter todos by completion status
 */
export const filterByStatus = (todos, filterBy) => {
  switch (filterBy) {
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'pending':
      return todos.filter(todo => !todo.completed);
    case 'all':
    default:
      return todos;
  }
};

/**
 * Sort todos by various criteria
 */
export const sortTodos = (todos, sortBy, sortOrder) => {
  const sortedTodos = [...todos];

  sortedTodos.sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;

      case 'dueDate':
        aValue = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
        bValue = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
        break;

      case 'time':
        aValue = a.time ? a.time : '99:99';
        bValue = b.time ? b.time : '99:99';
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

  return sortedTodos;
};

/**
 * Apply all filters and sorting to todos
 */
export const applyAllFilters = (todos, filters) => {
  const {
    searchQuery,
    filterBy,
    dateFilter,
    timeFilter,
    customDateRange,
    customTimeRange,
    sortBy,
    sortOrder
  } = filters;

  let filteredTodos = todos;

  // Apply text search
  filteredTodos = filterBySearch(filteredTodos, searchQuery);

  // Apply status filter
  filteredTodos = filterByStatus(filteredTodos, filterBy);

  // Apply date filter
  filteredTodos = filterByDate(filteredTodos, dateFilter, customDateRange);

  // Apply time filter
  filteredTodos = filterByTime(filteredTodos, timeFilter, customTimeRange);

  // Apply sorting
  filteredTodos = sortTodos(filteredTodos, sortBy, sortOrder);

  return filteredTodos;
};

/**
 * Get filter summary for display
 */
export const getFilterSummary = (filters) => {
  const { searchQuery, filterBy, dateFilter, timeFilter, sortBy, sortOrder } = filters;
  const summary = [];

  if (searchQuery) summary.push(`Search: "${searchQuery}"`);
  if (filterBy !== 'all') summary.push(`Status: ${filterBy}`);
  if (dateFilter !== 'all') summary.push(`Date: ${dateFilter}`);
  if (timeFilter !== 'all') summary.push(`Time: ${timeFilter}`);
  summary.push(`Sort: ${sortBy} (${sortOrder})`);

  return summary.join(' • ');
};
