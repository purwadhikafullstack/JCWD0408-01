'use client';

import React, { useEffect, useState } from 'react';
import AddrMap from '../../../_components/addrmap';
import Cookies from 'js-cookie';
import AddrListTemplate from './addrlisttemplate';
import { addressCard, addressForm } from '@/types/address';
import { addAddress, editAddress } from '@/libs/action/address';
import Modal from '@/app/(home)/_components/modal';
import ConfirmationModal from '@/app/(home)/_components/confirmationmodal';

export default function Contents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<{ allAddress: addressCard[] }>({
    allAddress: [],
  });
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // State for confirmation modal
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [addressIdToDelete, setAddressIdToDelete] = useState<number | null>(
    null,
  );

  const handleOpenModal = (isAdding: boolean) => {
    setIsModalOpen(true);
    setIsAddingAddress(isAdding);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddressId(null);
    setIsAddingAddress(false);
  };

  const handleDelete = (addressId: number) => {
    setAddressIdToDelete(addressId); // Store the address ID to delete
    setIsConfirmationOpen(true); // Open the confirmation modal
  };

  const confirmDelete = async () => {
    if (addressIdToDelete !== null) {
      const token = Cookies.get('token');
      try {
        const res = await fetch('http://localhost:8000/api/address/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'DELETE',
          body: JSON.stringify({ address_id: addressIdToDelete }),
        });

        if (!res.ok) {
          throw new Error('Failed to delete address');
        }

        // Refetch addresses after deletion
        await fetchData();
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setIsConfirmationOpen(false); // Close the confirmation modal
        setAddressIdToDelete(null); // Reset the ID
      }
    }
  };

  const fetchData = async () => {
    const token = Cookies.get('token');
    try {
      const res = await fetch('http://localhost:8000/api/address/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user details');
      }

      const dat = await res.json();
      setData(dat);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditAddress = async (data: addressForm) => {
    if (editingAddressId !== null) {
      try {
        await editAddress({ ...data, address_id: editingAddressId });
        await fetchData();
        handleCloseModal();
      } catch (err) {
        console.error('Failed to update address:', err);
      }
    }
  };

  const handleAddAddress = async (data: addressForm) => {
    try {
      await addAddress(data);
      await fetchData();
      handleCloseModal();
    } catch (err) {
      console.error('Failed to add address:', err);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-main">My Addresses</h2>
        <button
          className="px-4 py-2 bg-main text-white rounded-lg shadow-lg"
          onClick={() => handleOpenModal(true)} // Set to add address
        >
          Add Address
        </button>
      </div>
      <div className="border-b border-gray-300 mb-4"></div>
      {data.allAddress.length > 0 ? (
        data.allAddress.map((allAddress: addressCard, idx: number) => (
          <AddrListTemplate
            key={idx}
            {...allAddress} // Spread the address properties
            onDelete={handleDelete} // Handle delete
            onEdit={(addressId) => {
              setEditingAddressId(addressId);
              handleOpenModal(false); // Open the modal for editing
            }}
          />
        ))
      ) : (
        <p>No addresses found.</p>
      )}

      {isModalOpen && (
        <Modal closeModal={handleCloseModal}>
          <AddrMap
            closeModal={handleCloseModal}
            submitFunction={
              isAddingAddress ? handleAddAddress : handleEditAddress
            }
          />
        </Modal>
      )}

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this address?"
      />
    </div>
  );
}
