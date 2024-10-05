'use client';

import { useState } from 'react';
import { FiShoppingCart, FiUser, FiHome, FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { onLogout } from '@/libs/action/user';

export default function BuyerNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="w-full z-20 fixed top-0 h-16 px-4 flex items-center justify-between shadow-md bg-secondary">
      <div className="flex items-center w-36">
        <Image src={'/logo/baskitgreen.svg'} width={150} height={50} alt="Logo" />
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="block p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FiX className="w-6 h-6 text-gray-700" />
          ) : (
            <FiMenu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>
      <div className={`absolute right-0 top-16 w-48 bg-secondary shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col p-4 space-y-6">
          <Link href="/">
            <button className="flex items-center space-x-2">
              <FiHome className="w-6 h-6 text-gray-700" />
              <span>Home</span>
            </button>
          </Link>
          <Link href="/cart">
            <button className="flex items-center space-x-2">
              <FiShoppingCart className="w-6 h-6 text-gray-700" />
              <span>Cart</span>
            </button>
          </Link>
            <button className="flex items-center space-x-2"
            onClick={onLogout}
            >
              <FiUser className="w-6 h-6 text-gray-700" />
              <span>Logout</span>
            </button>
        </div>
      </div>
    </nav>
  );
}
