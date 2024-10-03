'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaUser,
  FaShoppingCart,
  FaTicketAlt,
  FaMapMarkerAlt,
  FaHome,
  FaKey,
} from 'react-icons/fa';
import Image from 'next/image';
import BuyerNavbar from './buyernavbar';
import { onLogout } from '@/libs/action/user';

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
};

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState('/user');
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveItem(currentPath);

    const handleResize = () => {
      const isMobileSize = window.innerWidth < 1030;
      setIsMobile(isMobileSize);
      setIsSidebarOpen(!isMobileSize);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleItemClick = (href: string) => {
    setActiveItem(href);
  };

  return (
    <div>
      {!isMobile && isSidebarOpen && (
        <motion.div
          ref={sidebarRef}
          className="fixed top-0 left-0 bottom-0 w-64 bg-secondary shadow-2xl z-10"
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
          transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        >
          <div className="flex flex-col space-y-32 mt-10">
            <Link href={'/'}>
              <Image
                src={'/logo/baskitgreen.svg'}
                width={300}
                height={100}
                alt="baskitlogo"
              />
            </Link>
            <div className="flex flex-col items-start justify-center p-4 space-y-6">
              <Link
                href="/user"
                className="z-20 w-[200px]"
                onClick={() => handleItemClick('/user')}
              >
                <div
                  className={`text-main text-lg font-bold p-3 rounded cursor-pointer flex items-center 
                  ${activeItem === '/user' ? 'bg-main text-secondary' : 'hover:bg-main hover:text-secondary'}`}
                >
                  <FaUser />
                  <span className="ml-6">My Account</span>
                </div>
              </Link>
              <Link
                href="/user/address"
                className="z-20 w-[200px]"
                onClick={() => handleItemClick('/user/address')}
              >
                <div
                  className={`text-main text-lg font-bold p-3 rounded cursor-pointer flex items-center 
                  ${activeItem === '/user/address' ? 'bg-main text-secondary' : 'hover:bg-main hover:text-secondary'}`}
                >
                  <FaMapMarkerAlt />
                  <span className="ml-6">My Addresses</span>
                </div>
              </Link>
              <Link
                href="/orders"
                className="z-20 w-[200px]"
                onClick={() => handleItemClick('/orders')}
              >
                <div
                  className={`text-main text-lg font-bold p-3 rounded cursor-pointer flex items-center 
                  ${activeItem === '/orders' ? 'bg-main text-secondary' : 'hover:bg-main hover:text-secondary'}`}
                >
                  <FaShoppingCart />
                  <span className="ml-6">My Orders</span>
                </div>
              </Link>
              <Link
                href="/user/vouchers"
                className="z-20 w-[200px]"
                onClick={() => handleItemClick('/vouchers')}
              >
                <div
                  className={`text-main text-lg font-bold p-3 rounded cursor-pointer flex items-center 
                  ${activeItem === '/vouchers' ? 'bg-main text-secondary' : 'hover:bg-main hover:text-secondary'}`}
                >
                  <FaTicketAlt />
                  <span className="ml-6">My Vouchers</span>
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-start justify-center p-4 space-y-2">
              <Link
                href="/"
                className="z-20 w-[200px]"
                onClick={() => handleItemClick('/')}
              >
                <div
                  className={`text-main text-lg font-bold p-3 rounded cursor-pointer flex items-center 
                  ${activeItem === '/' ? 'bg-main text-secondary' : 'hover:bg-main hover:text-secondary'}`}
                >
                  <FaHome />
                  <span className="ml-6">Home</span>
                </div>
              </Link>
              <button className="z-20 w-[200px]" onClick={onLogout}>
                <div
                  className={`text-main text-lg font-bold p-3 rounded cursor-pointer flex items-center 
                    ${activeItem === '/logout' ? 'bg-main text-secondary' : 'hover:bg-main hover:text-secondary'}`}
                >
                  <FaKey />
                  <span className="ml-6">Logout</span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {isMobile && (
        <div>
          <nav className="fixed bottom-0 left-0 right-0 bg-secondary z-50 flex justify-around items-center shadow-[0_0_15px_rgba(0,0,0,0.6)] h-14">
            <Link
              href="/user"
              className={`hover:text-secondary text-lg font-bold flex items-center p-4 rounded 
      ${activeItem === '/user' ? 'bg-main text-secondary' : 'text-main'}`}
              onClick={() => handleItemClick('/user')}
            >
              <FaUser />
            </Link>
            <Link
              href="/user/address"
              className={`hover:text-secondary text-lg font-bold flex items-center p-4 rounded 
      ${activeItem === '/user/address' ? 'bg-main text-secondary' : 'text-main'}`}
              onClick={() => handleItemClick('/user/address')}
            >
              <FaMapMarkerAlt />
            </Link>
            <Link
              href="/orders"
              className={`hover:text-secondary text-lg font-bold flex items-center p-4 rounded 
      ${activeItem === '/orders' ? 'bg-main text-secondary' : 'text-main'}`}
              onClick={() => handleItemClick('/orders')}
            >
              <FaShoppingCart />
            </Link>
            <Link
              href="/user/vouchers"
              className={`hover:text-secondary text-lg font-bold flex items-center p-4 rounded 
      ${activeItem === '/vouchers' ? 'bg-main text-secondary' : 'text-main'}`}
              onClick={() => handleItemClick('/vouchers')}
            >
              <FaTicketAlt />
            </Link>
          </nav>
          <BuyerNavbar />
        </div>
      )}
    </div>
  );
}
