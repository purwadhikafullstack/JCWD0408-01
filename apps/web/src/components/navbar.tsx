'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FiShoppingCart, FiUser, FiGift, FiMenu, FiSearch, FiX, } from 'react-icons/fi';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { motion } from 'framer-motion';
import { PiBasket } from "react-icons/pi";
import { AddToCartNav } from './navbar/addToCartNav';
import Cookies from 'js-cookie';
import { PiSignInBold } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FiLogOut } from "react-icons/fi";
import { ProductResult } from './navbar/type';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<ProductResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [data, setData] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const token = Cookies.get('token');
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchDataProduct = async () => {
    if (search.trim() === '') {
      setResults(null);
      setIsModalOpen(false);
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}product/products-catalogue/?search=${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: ProductResult = await res.json();
      setResults(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleResetSearch = () => {
    setSearch('');
    setResults(null);
    setIsModalOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setData(search);
      console.log(`data: ${data}`);
    }
  };

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (search.trim() !== '') {
        fetchDataProduct();
      } else {
        setResults(null);
        setIsModalOpen(false);
      }
    }, 300);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [search]);

  const toIDR = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  const deleteCookie = () => {
    Cookies.remove('token');
    router.push('/login');
    toast.success('Logout Success');
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div className='w-full'>
      <nav className="w-full z-20 fixed top-0 lg:h-24 h-16 px-2 md:px-8 flex items-center justify-between shadow-md bg-secondary">
        <button onClick={handleResetSearch}>
          <Link href={"/"} className="flex items-center w-[75px] md:w-[175px] lg:w-[250px]">
            <Image src={'/logo/baskitgreen.svg'} width={175} height={100} alt='' />
          </Link>
        </button>
        <div
          className={clsx('flex-grow max-w-md mx-auto transition-all', {
            hidden: isSearchOpen,
          })}
        >
          <div className="relative ">
            <input
              type="text"
              placeholder="items?..."
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-2 border border-main rounded-full focus:outline-none"
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:scale-125"
              onClick={fetchDataProduct}
            >
              <FiSearch size={16} className=" text-main mr-1 " />
            </button>

          </div>
        </div>
        <div className="flex items-center  justify-between">
          <button
            className="block md:hidden p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
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
          {
            !token && (
              <div className="hidden gap-3 md:flex sm:w-[160px]  lg:w-[271px] text-right justify-end">
                <Link href={'/register'}>
                  <button className="p-2 flex items-center gap-2 hover:bg-main rounded-full hover:text-secondary place-content-center duration-300 text-[14px]">
                    <p>REGISTER</p>
                  </button>
                </Link>
                <Link href={'/login'}>
                  <button className="p-2 flex items-center gap-2 hover:bg-main rounded-full hover:text-secondary place-content-center duration-300 text-[14px]">
                    <p>LOGIN</p>
                  </button>
                </Link>
              </div>
            )
          }
          {
            token && (
              <div className="hidden md:flex items-center space-x-6 sm:w-[160px]  lg:w-[271px]">
                <button className="p-2 hover:bg-main rounded-full hover:text-secondary place-content-center duration-300">
                  <FiGift size={24} />
                </button>
                <button className="p-2 hover:bg-main rounded-full  hover:text-secondary place-content-center duration-300">
                  <PiBasket size={24} />
                </button>
                <div
                  className="relative rounded "
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={'/login'}>
                    <button className="p-2 hover:bg-main rounded-full  hover:text-secondary duration-300">
                      <FiUser size={24} />
                    </button>
                  </Link>
                  {isDropdownOpen && (
                    <motion.div className="absolute right-0 mt-2 w-48 bg-main/30 backdrop-blur-sm border-[1px]  border-main shadow-xl rounded-[6px]">
                      <div className="flex flex-col">
                        <Link href={"/user"} className=" text-center px-4 py-2 text-secondary duration-200 hover:bg-main hover:text-secondary">
                          Profile
                        </Link>
                        <button className="px-4 py-2 text-secondary duration-200 hover:bg-main hover:text-secondary">
                          Settings
                        </button>
                        <button onClick={deleteCookie} className="px-4 py-2 text-secondary duration-200 hover:bg-main hover:text-secondary">
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )
          }
        </div>
        {
          !token && (
            isMenuOpen && (
              <div className="absolute top-16 right-0 w-full bg-white shadow-lg md:hidden duration-300">
                <div className="flex flex-col bg-main/30 backdrop-blur-sm border-[1px]  border-main ">
                  <Link href={"/register"} className='p-2 text-main duration-200 hover:bg-main hover:text-secondary'>
                    <button className="flex items-center gap-2"><PiSignInBold className="w-6 h-6" /><span>Register</span></button>
                  </Link>
                  <Link href={"/login"} className='p-2 text-main duration-200 hover:bg-main hover:text-secondary'>
                    <button className="flex items-center gap-2"><FiUser className="w-6 h-6" /><span>Login</span></button>
                  </Link>
                </div>
              </div>
            )
          )
        }
        {
          token && (
            isMenuOpen && (
              <div className="absolute top-16 right-0 w-full bg-white shadow-lg md:hidden duration-300">
                <div className="flex flex-col bg-main/30 backdrop-blur-sm border-[1px]  border-b-main ">
                  <div className='p-2 text-main duration-200 hover:bg-main hover:text-secondary'>
                    <button className="flex items-center gap-2 "><FiGift className="w-6 h-6" /><span className=''>Vouchers</span></button>
                  </div>
                  <div className='p-2 text-main duration-200 hover:bg-main hover:text-secondary'>
                    <button className="flex items-center gap-2"><FiShoppingCart className="w-6 h-6" /><span>Cart</span></button>
                  </div>
                  <div className='p-2 text-main duration-200 hover:bg-main hover:text-secondary'>
                    <button className="flex items-center gap-2"><FiUser className="w-6 h-6" /><span>Profile</span></button>
                  </div>
                  <button onClick={deleteCookie} className="p-2 text-left text-secondary duration-200 hover:bg-main hover:text-secondary flex gap-2">
                    <FiLogOut size={24} /> <span>Logout</span>
                  </button>
                </div>
              </div>
            )
          )
        }
      </nav>
      {isModalOpen && results && results.product && results.product.length > 0 && (
        <motion.div className=" flex flex-col gap-5 fixed z-30 top-16 sm:top-18 lg:top-24 w-full bg-main/50 backdrop-blur-sm border-b-[1px] border-main"
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className='flex items-center justify-center p-5'>
            <button onClick={handleResetSearch}><IoMdCloseCircleOutline size={32} className='text-secondary hover:scale-110 active:scale-95 duration-300 hover:bg-main hover:text-secondary rounded-full' /></button>
          </div>
          <div className='flex flex-wrap justify-center gap-5 '>
            {results.product.slice().map((item, key) => (
              <div className='w-[165px]  hover:scale-105 hover:bg-secondary rounded-[6px] hover:text-main duration-300' key={key}>
          <Link href={`/details-product/${item.product_id}`} className="" key={key}>
            <button onClick={handleResetSearch}>
              <div className='w-full py-4 px-5 text-[14px] text-secondary text-left flex flex-col gap-2 items-center justify-between hover:text-main'>
                <div className='h-[150px] flex items-center'>
            <Image src={item.ProductImage && item.ProductImage.length > 0 ? item.ProductImage[0].url : '/dummy-image.jpg'
            } width={150} height={150} alt='Product' className='rounded-[6px] ' />
                </div>
                <p className='h-[40px]'>{item.name}</p>
                <p className='text-left'>{toIDR(item.price)}</p>
                <p className='text-[10px]'>{item.category.category_name}</p>
                <p>Qty: {item.Inventory[0].total_qty}</p>
              </div>
            </button>
          </Link>
          <div className='hover:scale-110 duration-300'>
            {
              token && (
                <AddToCartNav item={item.Inventory[0].total_qty} product_id={item.product_id} />
              )
            }
          </div>
              </div>
            ))}
          </div>
          <div>
          </div>
        </motion.div>
      )}
    </div >
  );
}
