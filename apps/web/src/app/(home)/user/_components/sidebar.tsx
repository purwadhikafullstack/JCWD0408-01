'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
          className="fixed top-0 left-0 bottom-0 w-64 bg-secondary shadow-md z-10"
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="flex flex-col items-start justify-center h-full p-4 space-y-6">
            <Link href="/user" className='z-20 w-[200px]'>
              <div className="text-main text-lg font-bold hover:bg-main hover:text-secondary p-3 rounded w-full text-left flex justify-between items-center transition-colors">
                My Account
                </div>
            </Link>
            <Link href="/orders" className='z-20 w-[200px]'>
              <div className="text-main text-lg font-bold hover:bg-main hover:text-secondary p-3 rounded cursor-pointer text-left transition-colors">
                My Orders
              </div>
            </Link>
            <Link href="/vouchers" className='z-20 w-[200px]'>
              <div className="text-main text-lg font-bold hover:bg-main hover:text-secondary p-3 rounded cursor-pointer text-left transition-colors z-20">
                My Vouchers
              </div>
            </Link>
          </div>
        </motion.div>
      )}

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-main z-50 flex justify-around items-center p-3 shadow-lg">
          <Link href="/user" className="text-white text-lg font-bold hover:text-darkgreen">
            My Account
          </Link>
          <Link href="/orders" className="text-white text-lg font-bold hover:text-darkgreen">
            My Orders
          </Link>
          <Link href="/vouchers" className="text-white text-lg font-bold hover:text-darkgreen">
            My Vouchers
          </Link>
        </nav>
      )}
    </div>
  );
}
