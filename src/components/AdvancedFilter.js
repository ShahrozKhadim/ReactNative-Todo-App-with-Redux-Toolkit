import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchTodos,
  filterByDate,
  filterByTime,
  setCustomDateRange,
  setCustomTimeRange,
  sortByTime,
  clearAllFilters
} from '../features/filters';
import Button from './Button';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { 
  colors, 
  responsive,
  DATE_FILTER_OPTIONS,
  TIME_FILTER_OPTIONS,
  SORT_OPTIONS,
  SORT_ORDER_OPTIONS,
} from '../utils';

/**
 * AdvancedFilter - Comprehensive filter component for todos
 * Provides search, date filtering, time filtering, and sorting options
 */
const AdvancedFilter = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const filtersState = useSelector((state) => state.filters);

  // Use filters state with safe defaults
  const searchQuery = filtersState?.searchQuery || '';
  const dateFilter = filtersState?.dateFilter || 'all';
  const timeFilter = filtersState?.timeFilter || 'all';
  const sortBy = filtersState?.sortBy || 'createdAt';
  const sortOrder = filtersState?.sortOrder || 'desc';
  const customDateStart = filtersState?.customDateRange?.start || null;
  const customDateEnd = filtersState?.customDateRange?.end || null;
  const customTimeStart = filtersState?.customTimeRange?.start || null;
  const customTimeEnd = filtersState?.customTimeRange?.end || null;

  // Local search state for debounced search
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);


  const handleApplyFilters = () => {
    onClose();
  };

  const handleClearFilters = () => {
    dispatch(clearAllFilters());
    setLocalSearchQuery('');
    onClose();
  };

  // Callback functions to avoid inline functions
  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(searchTodos(localSearchQuery));
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchQuery, dispatch]);

  const handleSearchChange = useCallback((text) => {
    setLocalSearchQuery(text);
  }, []);

  const handleDateFilterChange = useCallback((value) => {
    dispatch(filterByDate(value));
  }, [dispatch]);

  const handleTimeFilterChange = useCallback((value) => {
    dispatch(filterByTime(value));
  }, [dispatch]);

  const handleCustomDateStartChange = useCallback((date) => {
    dispatch(setCustomDateRange({
      start: date,
      end: customDateEnd
    }));
  }, [dispatch, customDateEnd]);

  const handleCustomDateEndChange = useCallback((date) => {
    dispatch(setCustomDateRange({
      start: customDateStart,
      end: date
    }));
  }, [dispatch, customDateStart]);

  const handleCustomTimeStartChange = useCallback((time) => {
    dispatch(setCustomTimeRange({
      start: time,
      end: customTimeEnd
    }));
  }, [dispatch, customTimeEnd]);

  const handleCustomTimeEndChange = useCallback((time) => {
    dispatch(setCustomTimeRange({
      start: customTimeStart,
      end: time
    }));
  }, [dispatch, customTimeStart]);

  const handleSortByChange = useCallback((sortBy) => {
    dispatch(sortByTime({ sortBy, sortOrder }));
  }, [dispatch, sortOrder]);

  const handleSortOrderChange = useCallback((sortOrder) => {
    dispatch(sortByTime({ sortBy, sortOrder }));
  }, [dispatch, sortBy]);

  const renderFilterSection = (title, options, currentValue, onValueChange) => (
    <View style={styles.filterSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              currentValue === option.value && styles.optionButtonSelected,
            ]}
            onPress={() => onValueChange(option.value)}
          >
            <Text
              style={[
                styles.optionText,
                currentValue === option.value && styles.optionTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Advanced Filters</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Search Section */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Search</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or description..."
              value={localSearchQuery}
              onChangeText={handleSearchChange}
              multiline={false}
            />
          </View>

          {/* Date Filter Section */}
          {renderFilterSection('Date Filter', DATE_FILTER_OPTIONS, dateFilter, handleDateFilterChange)}

          {dateFilter === 'custom' && (
            <View style={styles.customRangeContainer}>
              <Text style={styles.customRangeTitle}>Custom Date Range</Text>
              <View style={styles.dateRangeRow}>
                <View style={styles.dateRangeItem}>
                  <Text style={styles.dateRangeLabel}>Start Date</Text>
                  <DatePicker
                    value={customDateStart}
                    onChange={handleCustomDateStartChange}
                    placeholder="Select start date"
                  />
                </View>
                <View style={styles.dateRangeItem}>
                  <Text style={styles.dateRangeLabel}>End Date</Text>
                  <DatePicker
                    value={customDateEnd}
                    onChange={handleCustomDateEndChange}
                    placeholder="Select end date"
                  />
                </View>
              </View>
            </View>
          )}

          {/* Time Filter Section */}
          {renderFilterSection('Time Filter', TIME_FILTER_OPTIONS, timeFilter, handleTimeFilterChange)}

          {timeFilter === 'custom' && (
            <View style={styles.customRangeContainer}>
              <Text style={styles.customRangeTitle}>Custom Time Range</Text>
              <View style={styles.timeRangeRow}>
                <View style={styles.timeRangeItem}>
                  <Text style={styles.timeRangeLabel}>Start Time</Text>
                  <TimePicker
                    value={customTimeStart}
                    onChange={handleCustomTimeStartChange}
                    placeholder="Select start time"
                  />
                </View>
                <View style={styles.timeRangeItem}>
                  <Text style={styles.timeRangeLabel}>End Time</Text>
                  <TimePicker
                    value={customTimeEnd}
                    onChange={handleCustomTimeEndChange}
                    placeholder="Select end time"
                  />
                </View>
              </View>
            </View>
          )}

          {/* Sort Section */}
          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Sort By</Text>
            <View style={styles.sortContainer}>
              <View style={styles.sortByContainer}>
                {SORT_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.sortOptionButton,
                      sortBy === option.value && styles.sortOptionButtonSelected,
                    ]}
                    onPress={() => handleSortByChange(option.value)}
                  >
                    <Text
                      style={[
                        styles.sortOptionText,
                        sortBy === option.value && styles.sortOptionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.sortOrderContainer}>
                {SORT_ORDER_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.sortOrderButton,
                      sortOrder === option.value && styles.sortOrderButtonSelected,
                    ]}
                    onPress={() => handleSortOrderChange(option.value)}
                  >
                    <Text
                      style={[
                        styles.sortOrderText,
                        sortOrder === option.value && styles.sortOrderTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Clear All"
            onPress={handleClearFilters}
            variant="outline"
            size={'sm'}
            style={styles.clearButton}
          />
          <Button
            title="Apply Filters"
            onPress={handleApplyFilters}
            style={styles.applyButton}
            size={'sm'}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsive.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerTitle: {
    fontSize: responsive.fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  closeButton: {
    width: responsive.fontSize.xl,
    height: responsive.fontSize.xl,
    borderRadius: responsive.fontSize.xl * 0.5,
    backgroundColor: colors.gray["100"],
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    fontSize: responsive.fontSize.lg,
    color: colors.textSecondary,
  },

  content: {
    flex: 1,
    padding: responsive.padding.lg,
  },

  filterSection: {
    marginBottom: responsive.margin.xl,
    rowGap: responsive.margin.xs,
  },

  sectionTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  searchInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: responsive.borderRadius.md,
    padding: responsive.padding.sm,
    fontSize: responsive.fontSize.md,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.margin.sm,
  },

  optionButton: {
    paddingHorizontal: responsive.padding.sm,
    paddingVertical: responsive.padding.xs,
    borderRadius: responsive.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },

  optionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  optionText: {
    fontSize: responsive.fontSize.sm,
    color: colors.textSecondary,
  },

  optionTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },

  customRangeContainer: {
    marginTop: responsive.margin.md,
    padding: responsive.padding.md,
    backgroundColor: colors.gray["100"],
    borderRadius: responsive.borderRadius.md,
  },

  customRangeTitle: {
    fontSize: responsive.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: responsive.margin.md,
  },

  dateRangeRow: {
    flexDirection: 'row',
    gap: responsive.margin.md,
  },

  dateRangeItem: {
    flex: 1,
  },

  dateRangeLabel: {
    fontSize: responsive.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: responsive.margin.xs,
  },

  timeRangeRow: {
    flexDirection: 'row',
    gap: responsive.margin.md,
  },

  timeRangeItem: {
    flex: 1,
  },

  timeRangeLabel: {
    fontSize: responsive.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: responsive.margin.xs,
  },

  sortContainer: {
    gap: responsive.margin.md,
  },

  sortByContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsive.margin.sm,
  },

  sortOptionButton: {
    paddingHorizontal: responsive.padding.sm,
    paddingVertical: responsive.padding.xs,
    borderRadius: responsive.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },

  sortOptionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  sortOptionText: {
    fontSize: responsive.fontSize.sm,
    color: colors.textSecondary,
  },

  sortOptionTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },

  sortOrderContainer: {
    flexDirection: 'row',
    gap: responsive.margin.sm,
  },

  sortOrderButton: {
    paddingHorizontal: responsive.padding.sm,
    paddingVertical: responsive.padding.xs,
    borderRadius: responsive.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },

  sortOrderButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  sortOrderText: {
    fontSize: responsive.fontSize.sm,
    color: colors.textSecondary,
  },

  sortOrderTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    padding: responsive.padding.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: responsive.margin.md,
  },

  clearButton: {
    flex: 1,
  },

  applyButton: {
    flex: 1,
  },
});

export default AdvancedFilter;
