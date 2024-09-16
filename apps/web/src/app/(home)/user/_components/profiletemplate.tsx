import { Buyer } from '@/types/user';
import { motion } from 'framer-motion';
import Image from 'next/image';


export default function Profile({first_name, last_name, email, phone, date_ob, avatar} : Buyer) {
  return (
    <div className="flex flex-col pt-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center p-4"
      >
        <div className="relative">
          <Image 
            src={`${avatar}`}
            alt="Profile"
            width={400}
            height={400}
            className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-md"
          />
          <button className="absolute bottom-0 right-0 bg-main p-1 rounded-full border-2 border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 space-y-4 mt-16"
      >
        <div>
          <span className="block text-main-black text-sm">Full Name</span>
          <span className="block text-lg font-semibold">{first_name} {last_name}</span>
        </div>
        <div>
          <span className="block text-gray-600 text-sm">Email</span>
          <span className="block text-lg font-semibold">{email}</span>
        </div>
        <div>
          <span className="block text-gray-600 text-sm">Phone</span>
          <span className="block text-lg font-semibold">{phone}</span>
        </div>
        <div>
          <span className="block text-gray-600 text-sm">Date of Birth</span>
          <span className="block text-lg font-semibold">{date_ob}</span>
        </div>
      </motion.div>
    </div>
  );
}
