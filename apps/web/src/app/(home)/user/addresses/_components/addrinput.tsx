import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface AddressInputProps {
  address: string;
  onAddressChange: (value: string) => void;
  onSearch: (suggestion: string) => Promise<void>;
}

export default function AddressInput({ address, onAddressChange, onSearch }: AddressInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(address);
    }
  };

  return (
    <div className="flex items-stretch pt-10">
      <input
        type="text"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for an address..."
        className="border p-2 rounded mb-2 w-full"
      />
      <button
        onClick={() => onSearch(address)}
        className="ml-2 p-2 bg-main text-white rounded flex items-center h-[42px]"
      >
        <FaSearch />
      </button>
    </div>
  );
}
