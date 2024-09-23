'use client';

import { useCallback, useState } from 'react';
import {
  FiShoppingCart,
  FiUser,
  FiGift,
  FiMenu,
  FiSearch,
  FiX,
} from 'react-icons/fi';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleMouseEnter = useCallback(() => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsDropdownOpen(true);
  }, [dropdownTimeout]);

  const handleMouseLeave = useCallback(() => {
    const timeoutId = setTimeout(() => setIsDropdownOpen(false), 200);
    setDropdownTimeout(timeoutId);
  }, []);

  return (
    <nav className="w-full z-20 fixed top-0 h-24 px-4 md:px-8 flex items-center justify-between shadow-md bg-secondary">
      <div className="flex items-center w-36 lg:w-[271px]">
        <Image src={'/logo/baskit.svg'} width={270} height={100} alt=''/>
      </div>
      <div
        className={clsx('flex-grow max-w-md mx-auto transition-all', {
          hidden: isSearchOpen,
        })}
      >
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search for items..."
            className="w-full px-4 py-2 border border-main-black rounded-full focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:scale-125">
            <FiSearch className="w-5 h-5 text-main-black " />
          </button>
        </div>
      </div>
      <div className="flex items-center lg:w-[271px] space-x-6">
        <button
          className="block md:hidden p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          {isSearchOpen ? (
            <FiX className="w-6 h-6 text-gray-700" />
          ) : (
            <FiSearch className="w-6 h-6 text-gray-700" />
          )}
        </button>
        <button
          className="block md:hidden p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FiX className="w-6 h-6 text-gray-700" />
          ) : (
            <FiMenu className="w-6 h-6 text-gray-700" />
          )}
        </button>
        <div className="hidden md:flex items-center space-x-6">
          <button className="p-2 hover:bg-main rounded-full">
            <FiGift className="w-6 h-6 text-main-black hover:text-secondary" />
          </button>
          <button className="p-2 hover:bg-main rounded-full">
            <FiShoppingCart className="w-6 h-6 text-main-black hover:text-secondary" />
          </button>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={'/user'}>
            <button className="p-2 hover:bg-main rounded-full">
              <FiUser className="w-6 h-6 text-main-black hover:text-secondary" />
            </button>
            </Link>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-secondary border border-gray-300 shadow-xl">
                <div className="flex flex-col p-2 space-y-1">
                  <button className="px-4 py-2 text-main hover:bg-main hover:text-secondary">
                    Profile
                  </button>
                  <button className="px-4 py-2 text-main hover:bg-main hover:text-secondary">
                    Settings
                  </button>
                  <button className="px-4 py-2 text-main hover:bg-main hover:text-secondary">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isSearchOpen && (
        <div className="absolute top-16 left-0 right-0 px-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
            />
          </div>
        </div>
      )}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-48 bg-white shadow-lg md:hidden">
          <div className="flex flex-col p-4 space-y-2">
            <button className="flex items-center space-x-2">
              <FiGift className="w-6 h-6 text-gray-700" />
              <span>Vouchers</span>
            </button>
            <button className="flex items-center space-x-2">
              <FiShoppingCart className="w-6 h-6 text-gray-700" />
              <span>Cart</span>
            </button>
            <button className="flex items-center space-x-2">
              <FiUser className="w-6 h-6 text-gray-700" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
