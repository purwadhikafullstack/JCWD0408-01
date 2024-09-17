'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { VscAccount } from "react-icons/vsc";
import { AiOutlineProduct } from "react-icons/ai";
import { RiSecurePaymentLine } from "react-icons/ri";
import { RiDiscountPercentLine } from "react-icons/ri";

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
};

const submenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1 },
};

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {

  }

  useEffect(() => {
    const handleResize = () => {
      const isMobileSize = window.innerWidth < 1000;
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
          <div className="flex flex-col items-center justify-between h-full gap-5">
            <div>
              <div className="flex justify-center bg-secondary pr-2 mt-5">
                <Image src="/logo/baskit.svg" alt="About Us" width={500} height={100} className='' />
              </div>

              <Link href="/admin-product" className='z-20 w-[200px]'>
                <div className='text-main-black text-lg  hover:bg-main hover:text-secondary p-3 w-full mt-5 pl-5  text-left flex justify-start gap-2 items-center transition-colors'>
                  <AiOutlineProduct size={28} className="text-main-black" />
                  <div className="text-[18px]">
                    Product
                  </div>
                </div>
              </Link>
              <Link href="/paymentproof" className='z-20 w-[200px]'>
                <div className='text-main-black text-lg  hover:bg-main hover:text-secondary p-3 w-full pl-5  text-left flex justify-start gap-2 items-center transition-colors'>
                  <RiSecurePaymentLine size={28} className="text-main-black" />
                  <div className="text-[18px]">
                    Payment Proof
                  </div>

                </div>
              </Link>
              <Link href="/vouchermanagement" className='z-20 w-[200px]'>
              <div className=' text-main-black text-lg  hover:bg-main hover:text-secondary p-3 w-full pl-5  text-left flex justify-start gap-2 items-center transition-colors'>
                <RiDiscountPercentLine size={28} className="text-main-black" />
                <div className="text-[18px]">
                  Disc. Management
                </div>

              </div>
              </Link>
              <div className='border-[1px] border-white mt-5 w-full '></div>
              <Link href="/admin-dashboard" className='z-20 w-[200px]'>
                <div className="text-main-black text-lg  hover:bg-main hover:text-secondary p-3 pl-5 cursor-pointer text-left transition-colors z-20">
                  Dashboard
                </div>
              </Link>
            </div>
            <div>
              <button className="w-64 text-main text-lg font-bold hover:bg-white hover:text-black p-3 mb-5 cursor-pointer text-center transition-colors z-20">Logout</button>
            </div>
          </div>
        </motion.div>
      )}

      {isMobile && (
        <nav className="fixed  bottom-0 left-0 right-0 bg-main z-50 flex justify-around items-center p-3 shadow-lg">
          <Link href="/" className="text-white text-lg font-bold hover:text-darkgreen">
            <VscAccount size={38} />
          </Link>
          <Link href="/" className="text-white text-lg font-bold hover:text-darkgreen">
            My Orders
          </Link>
          <Link href="/" className="text-white text-lg font-bold hover:text-darkgreen">
            My Vouchers
          </Link>
        </nav>
      )}
    </div>
  );
}
