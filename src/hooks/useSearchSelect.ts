import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './useDebounce';

interface UseSearchSelectProps<T> {
  value: string | number | null;
  loadItem: (id: string | number) => Promise<T>;
  searchItems: (query: string) => Promise<T[]>;
  getDisplayLabel: (item: T) => string;
}

interface UseSearchSelectState<T> {
  inputValue: string;
  suggestions: T[];
  selectedItem: T | null;
  isLoading: boolean;
  hasSearched: boolean;
  error: string | null;
}

export function useSearchSelect<T>({
  value,
  loadItem,
  searchItems,
  getDisplayLabel,
}: UseSearchSelectProps<T>) {
  const [state, setState] = useState<UseSearchSelectState<T>>({
    inputValue: '',
    suggestions: [],
    selectedItem: null,
    isLoading: false,
    hasSearched: false,
    error: null,
  });

  const debouncedSearch = useDebounce(state.inputValue, 300);

  // Load initial item when value changes
  useEffect(() => {
    let mounted = true;

    if (value) {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      loadItem(value)
        .then(item => {
          if (mounted) {
            setState(prev => ({
              ...prev,
              selectedItem: item,
              inputValue: getDisplayLabel(item),
              isLoading: false,
            }));
          }
        })
        .catch(error => {
          if (mounted) {
            setState(prev => ({
              ...prev,
              error: error.message,
              isLoading: false,
            }));
          }
        });
    } else {
      setState(prev => ({
        ...prev,
        selectedItem: null,
        error: null,
      }));
    }

    return () => {
      mounted = false;
    };
  }, [value, loadItem, getDisplayLabel]);

  // Handle search
  useEffect(() => {
    let mounted = true;

    if (debouncedSearch.length >= 2 && !state.selectedItem) {
      setState(prev => ({ ...prev, isLoading: true, hasSearched: true, error: null }));
      searchItems(debouncedSearch)
        .then(items => {
          if (mounted) {
            setState(prev => ({
              ...prev,
              suggestions: items,
              isLoading: false,
            }));
          }
        })
        .catch(error => {
          if (mounted) {
            setState(prev => ({
              ...prev,
              error: error.message,
              isLoading: false,
              suggestions: [],
            }));
          }
        });
    } else {
      setState(prev => ({
        ...prev,
        suggestions: [],
        hasSearched: debouncedSearch.length >= 2,
      }));
    }

    return () => {
      mounted = false;
    };
  }, [debouncedSearch, searchItems]);

  const setInputValue = useCallback((value: string) => {
    setState(prev => ({
      ...prev,
      inputValue: value,
      selectedItem: null,
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setState({
      inputValue: '',
      suggestions: [],
      selectedItem: null,
      isLoading: false,
      hasSearched: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    setInputValue,
    clearSelection,
  };
}