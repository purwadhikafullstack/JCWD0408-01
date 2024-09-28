'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaUser, FaShoppingCart, FaTicketAlt } from 'react-icons/fa';
import Image from 'next/image';

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
};

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
          <div className="flex flex-col space-y-40 mt-20">
            {/* Logo */}
            <Image
              src={'/logo/baskitgreen.svg'}
              width={300}
              height={100}
              alt="baskitlogo"
              className=""
            />

            {/* Sidebar Links */}
            <div className="flex flex-col items-start justify-center p-4 space-y-6">
              <Link href="/user" className="z-20 w-[200px]">
                <div className="text-main text-lg font-bold hover:bg-main hover:text-secondary p-3 rounded cursor-pointer flex items-center">
                  <FaUser />
                  <span className="ml-6">My Account</span>
                </div>
              </Link>
              <Link href="/orders" className="z-20 w-[200px]">
                <div className="text-main text-lg font-bold hover:bg-main hover:text-secondary p-3 rounded cursor-pointer flex items-center">
                  <FaShoppingCart />
                  <span className="ml-6">My Orders</span>
                </div>
              </Link>
              <Link href="/vouchers" className="z-20 w-[200px]">
                <div className="text-main text-lg font-bold hover:bg-main hover:text-secondary p-3 rounded cursor-pointer flex items-center">
                  <FaTicketAlt />
                  <span className="ml-6">My Vouchers</span>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-main z-50 flex justify-around items-center p-3 shadow-lg">
          <Link
            href="/user"
            className="text-white text-lg font-bold hover:text-darkgreen flex items-center"
          >
            <FaUser /> My Account
          </Link>
          <Link
            href="/orders"
            className="text-white text-lg font-bold hover:text-darkgreen flex items-center"
          >
            <FaShoppingCart /> My Orders
          </Link>
          <Link
            href="/vouchers"
            className="text-white text-lg font-bold hover:text-darkgreen flex items-center"
          >
            <FaTicketAlt /> My Vouchers
          </Link>
        </nav>
      )}
    </div>
  );
}
