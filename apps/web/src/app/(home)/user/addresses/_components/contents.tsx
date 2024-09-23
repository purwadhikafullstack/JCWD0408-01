'use client'

import React, { useState } from 'react';
import AddrModal from './addrmodal';
import AddrMap from './addrmap';
import Addrlist from './addrlist';
import AddrListTemplate from './addrlisttemplate';

export default function Contents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-main">My Addresses</h2>
        <button
          className="px-4 py-2 bg-main text-white rounded-lg shadow-lg"
          onClick={handleOpenModal}
        >
          Add Address
        </button>
      </div>
      <div className="border-b border-gray-300 mb-4"></div>
      <AddrListTemplate/>
      {isModalOpen && (
        <AddrModal closeModal={handleCloseModal}>
          <AddrMap closeModal={handleCloseModal}/>
        </AddrModal>
      )}
    </div>
  );
}
