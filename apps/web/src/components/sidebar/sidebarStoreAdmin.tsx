'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { VscAccount } from "react-icons/vsc";
import { AiOutlineProduct } from "react-icons/ai";
import { RiSecurePaymentLine } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { MdMenu } from 'react-icons/md';

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0 },
};

const submenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1 },
};

export default function SidebarStoreAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteToken = () => {
    Cookies.remove('token');
    router.push("/login-as-store")
    toast.success('Logout Success')
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

  const handleModal = () => { setIsModalOpen(!isModalOpen) }
  const handleLogout = () => { deleteToken(); router.push("/login-as-store") }

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

              <Link href="/store-list-by-store" className='z-20 w-[200px]'>
                <div className='text-main-black text-lg  hover:bg-main hover:text-secondary p-3 w-full mt-5 pl-5  text-left flex justify-start gap-2 items-center transition-colors'>
                  <AiOutlineProduct size={28} className="text-main-black" />
                  <div className="text-[18px]">
                    Store List
                  </div>
                </div>
              </Link>
              <Link href="/paymentproof" className='z-20 w-[200px]'>
                <div className='text-main-black text-lg  hover:bg-main hover:text-secondary p-3 w-full pl-5  text-left flex justify-start gap-2 items-center transition-colors'>
                  <LuClipboardList size={28} className="text-main-black" />
                  <div className="text-[18px]">
                    Orders
                  </div>
                </div>
              </Link>
              {/* <Link href="/vouchermanagement" className='z-20 w-[200px]'>
                <div className=' text-main-black text-lg  hover:bg-main hover:text-secondary p-3 w-full pl-5  text-left flex justify-start gap-2 items-center transition-colors'>
                  <RiDiscountPercentLine size={28} className="text-main-black" />
                  <div className="text-[18px]">
                    Disc. Management
                  </div>
                </div>
              </Link> */}
              <div className='border-[1px] border-white mt-5 w-full '></div>
            </div>
            <div>
              <button onClick={deleteToken} className="w-64 text-main text-lg font-bold hover:bg-white hover:text-black p-3 mb-5 cursor-pointer text-center transition-colors z-20">Logout</button>
            </div>
          </div>
        </motion.div>
      )}


      {isMobile && (
        <nav className="fixed  bottom-0 left-0 right-0 backdrop-blur-sm border-t-[1px] border-main bg-secondary/50 z-50 flex justify-between items-center p-2 px-4 shadow-lg">
          <Link href="/" className="text-white text-lg font-bold hover:text-darkgreen">
            <Image src="/logo/baskitgreen.svg" alt="About Us" width={100} height={100} className='' />
          </Link>
          <MdMenu size={28} className='w-20' onClick={handleModal} />
          {
            isModalOpen && (
              <div className='absolute bottom-14 left-0 w-full text-center backdrop-blur-sm border-t-[1px] border-main bg-secondary/80 flex flex-col gap-4 p-2 text-main '>
                <Link href={"/store-list-by-store"}>
                  Store List
                </Link>
                <Link href={"/manual-order"}>
                  Orders
                </Link>
                <button onClick={handleLogout} className='active:bg-main active:text-secondary duration-300'>
                  Logout
                </button>
              </div>
            )
          }
        </nav>
      )}
    </div>
  );
}
