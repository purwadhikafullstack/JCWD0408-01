'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

interface ProductResult {
  product: [
    {
      Inventory: []
      category: {
        category_id: number
        category_name: string
        description: string
        created_at: string
        updated_at: string
      }
      category_id: number
      created_at: string
      description: string
      image: string
      name: string
      price: number
      product_id: number
      store_id: number
      updated_at: string
    }
  ]
  currentPage: number
  totalPages: number
  status: string
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null,);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<ProductResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  const fetchDataProduct = async () => {
    if (search === ' ' || search === '') {
      setResults(null);
      setIsModalOpen(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/api/product/products-catalogue/?search=${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: ProductResult = await res.json();
      console.log(data);
      setResults(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  console.log(results);


  const handleMouseEnter = useCallback(() => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsDropdownOpen(true);
  }, [dropdownTimeout, setDropdownTimeout]);

  const handleMouseLeave = useCallback(() => {
    const timeoutId = setTimeout(() => setIsDropdownOpen(false), 200);
    setDropdownTimeout(timeoutId);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      fetchDataProduct();
      // if (e.target.value.trim() === '') {
      //   setIsModalOpen(false)
      //   setResults(null);}
    });
  };

  const handleResetSearch = () => {
    setSearch('');
    setResults(null);
    setIsModalOpen(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      fetchDataProduct();
    }
  };

  return (
    <nav className="w-full z-20 fixed top-0 lg:h-24 h-16 px-4 md:px-8 flex items-center justify-between shadow-md bg-secondary">
      <button onClick={handleResetSearch}>
        <Link href={"/"} className="flex items-center w-36 lg:w-[271px]">
          <Image src={'/logo/baskit.svg'} width={270} height={100} alt='' />
        </Link>
      </button>
      <div
        className={clsx('flex-grow max-w-md mx-auto transition-all', {
          hidden: isSearchOpen,
        })}
      >
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search for items..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 border border-main-black rounded-full focus:outline-none"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:scale-125"
            onClick={fetchDataProduct}
          >
            <FiSearch className="w-5 h-5 text-main-black" />
          </button>
          {isModalOpen && results && results.product && results.product.length > 0 && (
            <div className="absolute top-5  w-full h-full mt-2 p-4 z-100">
              <ul className='w-full border border-main trans rounded-[6px] bg-main/45 backdrop-blur-lg'>
                {results.product.slice().map((item, index) => (
                  <div key={index} className=''>
                    <Link href={`/details-product/${item.product_id}`} className="">
                      <button onClick={handleResetSearch} className='w-full hover:scale-x-105 hover:bg-secondary rounded-[6px] hover:text-main duration-300'>
                        <div className='w-full py-4 px-5 text-[14px] text-secondary flex items-center justify-between hover:text-main'>
                          <p>{item.name}</p>
                          <p className='text-[10px]'>{item.category.category_name}</p>
                        </div>
                      </button>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          )}
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
