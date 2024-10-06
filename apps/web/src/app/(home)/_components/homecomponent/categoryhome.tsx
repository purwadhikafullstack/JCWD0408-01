"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { HomePageCategory } from '@/types/homeproduct'

export default function CategoryHome({category_id, category_name, category_url, description} : HomePageCategory) {
  

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-lg border-2 border-main"
      >
          <Image
            src={category_url}
            alt="Random circular image"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-white text-lg font-semibold">See Details</p>
        </motion.div>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-lg font-bold text-gray-800"
      >
        {category_name}
      </motion.h2>
    </div>
  )
}