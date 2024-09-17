'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BuyerProfile from './buyerprofile';


const tabVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function AccountTab() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-col lg:w-4/5 lg:ml-64 mt-32 ">
      <div className="flex border-b border-gray-300 lg:w-2/5 px-3">
        <button
          className={`flex-1 py-2 px-4 text-sm font-semibold text-center ${activeTab === 'profile' ? 'bg-main text-white' : 'bg-secondary text-black'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-semibold text-center ${activeTab === 'addresses' ? 'bg-main text-white' : 'bg-secondary text-black'}`}
          onClick={() => setActiveTab('addresses')}
        >
          Addresses
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-semibold text-center ${activeTab === 'changePassword' ? 'bg-main text-white' : 'bg-secondary text-black'}`}
          onClick={() => setActiveTab('changePassword')}
        >
          Change Password
        </button>
      </div>

      <AnimatePresence>
        {activeTab === 'profile' && (
          <motion.div
            className="p-4 flex-1"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tabVariants}
            transition={{ duration: 0.3 }}
          >
            <BuyerProfile/>
          </motion.div>
        )}
        {activeTab === 'addresses' && (
          <motion.div
            className="p-4 flex-1"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tabVariants}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold">Addresses</h2>
            <p>Your addresses content here.</p>
          </motion.div>
        )}
        {activeTab === 'changePassword' && (
          <motion.div
            className="p-4 flex-1"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={tabVariants}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold">Change Password</h2>
            <p>Your change password content here.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
