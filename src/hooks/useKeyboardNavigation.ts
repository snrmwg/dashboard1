import { useState, KeyboardEvent } from 'react';

interface UseKeyboardNavigationProps {
  itemsCount: number;
  onSelect: () => void;
  onClear: () => void;
}

export function useKeyboardNavigation({
  itemsCount,
  onSelect,
  onClear,
}: UseKeyboardNavigationProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onClear();
      setHighlightedIndex(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => 
        prev < itemsCount - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && highlightedIndex > -1) {
      e.preventDefault();
      onSelect();
    }
  };

  return {
    highlightedIndex,
    setHighlightedIndex,
    handleKeyDown,
  };
}