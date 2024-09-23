import React from 'react';

interface SuggestionsListProps {
  suggestions: string[];
  suggestionsRef: React.RefObject<HTMLUListElement>;
  onSelect: (suggestion: string) => Promise<void>;
}

export default function SuggestionsList({ suggestions, suggestionsRef, onSelect }: SuggestionsListProps) {
  return suggestions.length > 0 ? (
    <ul
      ref={suggestionsRef}
      className="absolute z-10 w-full border border-gray-300 bg-white rounded shadow-lg max-h-60 overflow-y-auto"
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => onSelect(suggestion)}
          className="cursor-pointer p-2 hover:bg-gray-200"
        >
          {suggestion}
        </li>
      ))}
    </ul>
  ) : null;
}