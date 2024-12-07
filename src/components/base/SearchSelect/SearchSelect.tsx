import React, { useRef, useCallback } from 'react';
import type { SearchSelectProps } from './types';
import { SearchInput } from './SearchInput';
import { SuggestionsList } from './SuggestionsList';
import { useSearchSelect } from '@/hooks/useSearchSelect';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

export function SearchSelect<T>({
  value,
  onChange,
  onSelect,
  loadItem,
  searchItems,
  getItemId,
  getItemLabel,
  renderItem,
  placeholder = 'Search...',
  disabled = false,
  required = false,
  error: propError,
}: SearchSelectProps<T>) {
  if (!getItemLabel && !renderItem) {
    throw new Error('Either getItemLabel or renderItem must be provided');
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  const getDisplayLabel = useCallback((item: T) => getItemLabel ? getItemLabel(item) : '', [getItemLabel]);

  const {
    inputValue,
    suggestions,
    selectedItem,
    isLoading,
    hasSearched,
    error: apiError,
    setInputValue,
    clearSelection,
  } = useSearchSelect({
    value,
    loadItem,
    searchItems,
    getDisplayLabel,
  });

  const handleSelectItem = useCallback((item: T) => {
    onChange(getItemId(item));
    onSelect?.(item);
    inputRef.current?.blur();
  }, [onChange, onSelect, getItemId]);

  const handleClear = useCallback(() => {
    clearSelection();
    onChange(null);
    onSelect?.(null);
    inputRef.current?.focus();
  }, [clearSelection, onChange, onSelect]);

  const {
    highlightedIndex,
    setHighlightedIndex,
    handleKeyDown,
  } = useKeyboardNavigation({
    itemsCount: suggestions.length,
    onSelect: () => suggestions[highlightedIndex] && handleSelectItem(suggestions[highlightedIndex]),
    onClear: handleClear,
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (selectedItem) {
      onChange(null);
      onSelect?.(null);
    }
    setHighlightedIndex(-1);
  }, [selectedItem, onChange, onSelect, setInputValue, setHighlightedIndex]);

  const error = propError || apiError;

  return (
    <div className="relative">
      <SearchInput
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onKeyDown={handleKeyDown}
        onClear={handleClear}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        error={error}
        isLoading={isLoading}
        showClearButton={Boolean(selectedItem || inputValue)}
      />
      
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      <SuggestionsList<T>
        show={isFocused && (suggestions.length > 0 || (hasSearched && !isLoading && suggestions.length === 0 && inputValue.length >= 2))}
        suggestions={suggestions}
        getItemId={getItemId}
        getItemLabel={getItemLabel}
        renderItem={renderItem}
        highlightedIndex={highlightedIndex}
        onSelect={handleSelectItem}
        onHighlight={setHighlightedIndex}
        searchTerm={inputValue}
      />
    </div>
  );
}