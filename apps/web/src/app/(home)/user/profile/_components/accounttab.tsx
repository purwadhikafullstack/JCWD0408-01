'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BuyerProfile from './buyerprofile';
import Addresses from '../../addresses/page';

const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AccountTab() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { name: "Profile", value: 'profile', content: <BuyerProfile /> },
    { name: "Addresses", value: 'addresses', content: <Addresses /> },
    { name: "Change Password", value: 'changePassword', content: <div>Your change password content here.</div> },
  ];

  return (
    <div className="flex flex-col lg:w-4/5 lg:ml-64 mt-24">
      <div className="flex justify-center gap mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`px-4 py-2 duration-300 rounded w-60 text-sm font-semibold text-center ${activeTab === tab.value ? "bg-main text-white" : "bg-secondary"}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode='wait'>
          {tabs.map(tab => (
            activeTab === tab.value && (
              <motion.div
                key={tab.value}
                className="p-4 flex-1"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={tabVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }} 
              >
                {tab.content}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
