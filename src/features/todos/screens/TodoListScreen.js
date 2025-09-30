import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  filterTodos,
  searchTodos,
  clearAllFilters,
  setLoadingMore,
  updatePaginationInfo,
  fetchTodos,
} from '../slices/todosSlice';
import TodoItem from '../components/TodoItem';
import EmptyState from '../../../components/EmptyState';
import Button from '../../../components/Button';
import AdvancedFilter from '../../../components/AdvancedFilter';
import { colors, responsive } from '../../../utils';
import { applyAllFilters } from '../../../utils';

/**
 * TodoListScreen - Main screen displaying all todos
 */
const TodoListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const todosState = useSelector(state => state.todos);
  const { todos, loading, error, sortBy, sortOrder, filterBy, searchQuery } =
    todosState;

  // Safe defaults for pagination to prevent undefined errors
  const pagination = todosState.pagination || {
    currentPage: 0,
    pageSize: 20,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    isLoadingMore: false,
  };

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Fetch todos on component mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Initialize pagination state if not present (migration)
  useEffect(() => {
    if (!todosState.pagination) {
      dispatch(
        updatePaginationInfo({
          totalItems: todos.length,
          hasNextPage: todos.length > 20,
          hasPreviousPage: false,
        }),
      );
    }
  }, [todosState.pagination, todos.length, dispatch]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(searchTodos(localSearchQuery));
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchQuery, dispatch]);

  // Get filtered and sorted todos using advanced filtering with memoization
  const allFilteredTodos = useMemo(() => {
    const filters = {
      searchQuery,
      filterBy,
      dateFilter: todosState.dateFilter || 'all',
      timeFilter: todosState.timeFilter || 'all',
      customDateRange: todosState.customDateRange || { start: null, end: null },
      customTimeRange: todosState.customTimeRange || { start: null, end: null },
      sortBy,
      sortOrder,
    };

    return applyAllFilters(todos, filters);
  }, [
    todos,
    searchQuery,
    filterBy,
    todosState.dateFilter,
    todosState.timeFilter,
    todosState.customDateRange,
    todosState.customTimeRange,
    sortBy,
    sortOrder,
  ]);

  // Get paginated todos based on current page and page size
  const filteredTodos = useMemo(() => {
    const startIndex = pagination.currentPage * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return allFilteredTodos.slice(0, endIndex);
  }, [allFilteredTodos, pagination.currentPage, pagination.pageSize]);

  // Update pagination info when filtered todos change
  useEffect(() => {
    const totalItems = allFilteredTodos.length;
    const totalPages = Math.ceil(totalItems / pagination.pageSize);
    const hasNextPage = pagination.currentPage < totalPages - 1;
    const hasPreviousPage = pagination.currentPage > 0;

    dispatch(
      updatePaginationInfo({
        totalItems,
        hasNextPage,
        hasPreviousPage,
      }),
    );
  }, [allFilteredTodos, pagination.currentPage, pagination.pageSize, dispatch]);

  const handleRefresh = () => {
    dispatch(fetchTodos());
  };

  const handleLoadMore = useCallback(() => {
    if (!pagination.isLoadingMore && pagination.hasNextPage) {
      dispatch(setLoadingMore(true));

      // Simulate loading delay
      setTimeout(() => {
        dispatch(setLoadingMore(false));
        // Load more items by increasing the page size
        const newPageSize = pagination.pageSize + 20;
        dispatch({ type: 'todos/setPageSize', payload: newPageSize });
      }, 500);
    }
  }, [
    pagination.isLoadingMore,
    pagination.hasNextPage,
    pagination.pageSize,
    dispatch,
  ]);

  const handleClearAllFilters = () => {
    dispatch(clearAllFilters());
    setLocalSearchQuery('');
  };

  const getFilterSummary = () => {
    const summary = [];
    if (searchQuery) summary.push(`Search: "${searchQuery}"`);
    if (filterBy !== 'all') summary.push(`Status: ${filterBy}`);
    if (todosState.dateFilter !== 'all')
      summary.push(`Date: ${todosState.dateFilter}`);
    if (todosState.timeFilter !== 'all')
      summary.push(`Time: ${todosState.timeFilter}`);
    return summary.join(' • ');
  };

  const handleTodoPress = useCallback(
    todo => {
      navigation.navigate('TodoDetail', { todo });
    },
    [navigation],
  );

  const handleAddTodo = () => {
    navigation.navigate('AddTodo');
  };

  const renderTodoItem = useCallback(
    ({ item }) => (
      <TodoItem todo={item} onPress={() => handleTodoPress(item)} />
    ),
    [handleTodoPress],
  );

  const keyExtractor = useCallback(item => item.id, []);

  const renderEmptyState = () => {
    if (loading) {
      return (
        <EmptyState title="Loading..." description="Fetching your todos" />
      );
    }

    /*    if (error) {
      return (
        <EmptyState
          title="Error"
          description={error}
          actionTitle="Retry"
          onActionPress={handleRefresh}
        />
      );
    }*/

    if (filteredTodos.length === 0 && todos.length === 0) {
      return (
        <EmptyState
          title="No todos yet"
          description="Start by adding your first todo"
          actionTitle="Add Todo"
          onActionPress={handleAddTodo}
        />
      );
    }

    if (filteredTodos.length === 0 && todos.length > 0) {
      return (
        <EmptyState
          title="No matching todos"
          description="Try adjusting your search or filter"
          onActionPress={() => {
            setLocalSearchQuery('');
            dispatch(filterTodos('all'));
          }}
        />
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (pagination.isLoadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.footerText}>Loading more todos...</Text>
        </View>
      );
    }

    return null;
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.advancedFilterButton}
          onPress={() => setShowAdvancedFilters(true)}
        >
          <Text style={styles.advancedFilterText}>Advanced Search Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Summary */}
      {getFilterSummary() && (
        <View style={styles.filterSummary}>
          <Text style={styles.filterSummaryText}>{getFilterSummary()}</Text>
          <TouchableOpacity onPress={handleClearAllFilters}>
            <Text style={styles.clearFiltersText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTodos}
        renderItem={renderTodoItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={handleRefresh}
        // Pagination
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={20}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />

      <View style={styles.fabContainer}>
        <Button
          title="+"
          onPress={handleAddTodo}
          style={styles.fab}
          textStyle={styles.addText}
          size="sm"
        />
      </View>

      <AdvancedFilter
        visible={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  listContainer: {
    flexGrow: 1,
    paddingHorizontal: responsive.padding.md,
  },

  header: {
    paddingVertical: responsive.margin.md,
    rowGap: responsive.padding.sm,
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  filterOption: {
    backgroundColor: colors.gray[100],
    paddingHorizontal: responsive.padding.md,
    paddingVertical: responsive.padding.sm,
    borderRadius: responsive.borderRadius.md,
  },

  fabContainer: {
    position: 'absolute',
    bottom: responsive.padding.lg,
    right: responsive.padding.lg,
  },

  fab: {
    borderRadius: responsive.height.button * 0.75,
    backgroundColor: colors.primary,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsive.padding.md,
    gap: responsive.margin.sm,
  },

  footerText: {
    fontSize: responsive.fontSize.sm,
    color: colors.textSecondary,
  },

  // Advanced Filter Styles
  advancedFilterButton: {
    paddingHorizontal: responsive.padding.md,
    paddingVertical: responsive.padding.sm,
    backgroundColor: colors.primary,
    borderRadius: responsive.borderRadius.md,
    justifyContent: 'flex-end',
  },

  advancedFilterText: {
    fontSize: responsive.fontSize.sm,
    color: colors.white,
    fontWeight: '600',
  },

  filterSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsive.padding.md,
    backgroundColor: colors.gray['100'],
    borderRadius: responsive.borderRadius.md,
  },

  filterSummaryText: {
    fontSize: responsive.fontSize.sm,
    color: colors.textSecondary,
    flex: 1,
  },

  clearFiltersText: {
    fontSize: responsive.fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  addText: {
    fontSize: responsive.fontSize.xl,
  },
});

export default TodoListScreen;
