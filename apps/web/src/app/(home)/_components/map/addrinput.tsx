import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface AddressInputProps {
  address: string;
  onAddressChange: (value: string) => void;
  onSearch: (suggestion: string) => Promise<void>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function AddressInput({
  address,
  onAddressChange,
  onSearch,
  onKeyDown,
}: AddressInputProps) {
  return (
    <div className="relative">
      {' '}
      <div className="flex items-stretch pt-10">
        <input
          type="text"
          value={address}
          onChange={(e) => {
            onAddressChange(e.target.value);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search for an address..."
          className="border p-2 rounded mb-2 w-full"
        />
        <button
          onClick={() => onSearch(address)}
          className="bg-main text-white p-2 rounded ml-2"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
