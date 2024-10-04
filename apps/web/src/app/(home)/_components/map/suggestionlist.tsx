import React, { useEffect, useState } from 'react';

interface SuggestionsListProps {
  suggestions: string[];
  suggestionsRef: React.RefObject<HTMLUListElement>;
  onSelect: (suggestion: string) => Promise<void>;
}

export default function SuggestionsList({
  suggestions,
  suggestionsRef,
  onSelect,
}: SuggestionsListProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setActiveIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
      } else if (event.key === 'ArrowUp') {
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (event.key === 'Enter' && activeIndex >= 0) {
        onSelect(suggestions[activeIndex]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [suggestions, activeIndex, onSelect]);

  return suggestions.length > 0 ? (
    <ul
      ref={suggestionsRef}
      className="w-full border border-gray-300 bg-white rounded shadow-lg max-h-60 overflow-y-auto"
      style={{ top: 'calc(100% + 0.5rem)', left: 0 }} 
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
