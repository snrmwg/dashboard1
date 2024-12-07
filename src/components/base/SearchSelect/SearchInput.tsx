import React, { forwardRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  isLoading?: boolean;
  showClearButton?: boolean;
  onClear: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ error, isLoading, showClearButton, onClear, className = '', ...props }, ref) => (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        {...props}
        className={`w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:ring-blue-200'
        } ${props.disabled ? 'bg-gray-100' : 'bg-white'} ${className}`}
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      {showClearButton && !isLoading && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      {isLoading && (
        <Loader2 className="absolute right-3 top-2.5 h-5 w-5 text-blue-500 animate-spin" />
      )}
    </div>
  )
);

SearchInput.displayName = 'SearchInput';