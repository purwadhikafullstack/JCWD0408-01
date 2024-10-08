'use client'

import { motion } from 'framer-motion';
import { fifties } from "@/types/fonts";

export default function AddrHeader() {
  return (
    <div className='flex justify-center items-center lg:inline'>
      <motion.h1
        className={`${fifties.className} text-7xl pb-10 lg:text-8xl lg:mx-28 text-main lg:pb-24 pt-10`}
        initial={{ x: '100vw', skewX: -30, opacity: 0 }}
        animate={{ x: 0, skewX: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        Address
      </motion.h1>
    </div>
  );
}
