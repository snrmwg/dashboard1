import { useCallback } from 'react';
import { Check } from 'lucide-react';

interface SuggestionsListProps<T> {
  show: boolean;
  suggestions: T[];
  getItemId: (item: T) => number;
  getItemLabel: (item: T) => string;
  renderItem?: (item: T) => React.ReactNode;
  highlightedIndex: number;
  onSelect: (item: T) => void;
  onHighlight: (index: number) => void;
  searchTerm: string;
}

export function SuggestionsList<T>({
  show,
  suggestions,
  getItemId,
  getItemLabel,
  renderItem,
  highlightedIndex,
  onSelect,
  onHighlight,
  searchTerm,
}: SuggestionsListProps<T>) {
  const handleMouseEnter = useCallback((index: number) => {
    onHighlight(index);
  }, [onHighlight]);

  if (!show) return null;

  if (suggestions.length === 0 && searchTerm.length >= 2) {
    return (
      <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
        <div className="py-2 px-3 text-sm text-gray-500">
          No results found
        </div>
      </div>
    );
  }

  return (
    <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {suggestions.map((item, index) => (
        <li
          key={getItemId(item)}
          className={`relative cursor-default select-none py-2 pl-3 pr-9 ${
            index === highlightedIndex
              ? 'bg-indigo-600 text-white'
              : 'text-gray-900'
          }`}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => onSelect(item)}
        >
          {renderItem ? (
            renderItem(item)
          ) : (
            <span className="block truncate">{getItemLabel(item)}</span>
          )}
          {index === highlightedIndex && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
              <Check className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}