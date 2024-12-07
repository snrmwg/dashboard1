export interface SearchSelectProps<T> {
  value: number | null;
  onChange: (value: number | null) => void;
  onSelect?: (item: T | null) => void;
  loadItem: (id: number) => Promise<T | null>;
  searchItems: (query: string) => Promise<T[]>;
  getItemId: (item: T) => number;
  getItemLabel: (item: T) => string;
  renderItem?: (item: T) => React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}