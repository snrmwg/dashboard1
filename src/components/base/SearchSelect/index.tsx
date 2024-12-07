import { useCallback } from 'react';
import { SearchSelect as BaseSearchSelect } from './SearchSelect';
import type { SearchSelectProps } from './types';

export function SearchSelect<T>({
  value,
  onChange,
  loadItem,
  searchItems,
  getItemId,
  getItemLabel,
  renderItem,
  placeholder,
  error,
  ...props
}: SearchSelectProps<T>) {
  const handleSelect = useCallback((item: T | null) => {
    onChange(item ? getItemId(item) : null);
  }, [onChange, getItemId]);

  return (
    <BaseSearchSelect
      value={value}
      onChange={onChange}
      onSelect={handleSelect}
      loadItem={loadItem}
      searchItems={searchItems}
      getItemId={getItemId}
      getItemLabel={getItemLabel}
      renderItem={renderItem}
      placeholder={placeholder}
      error={error}
      {...props}
    />
  );
}

export type { SearchSelectProps };