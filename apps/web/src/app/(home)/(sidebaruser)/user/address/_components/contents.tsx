'use client';

import React, { useEffect, useState } from 'react';
import AddrMap from '../../../../_components/map/addrmap';
import AddrListTemplate from './addrlisttemplate';
import { addressCard, addressForm } from '@/types/address';
import {
  addAddress,
  deleteAddress,
  editAddress,
  getAddrList,
  setDefaultAddr,
} from '@/libs/action/address';
import Modal from '@/app/(home)/_components/map/modal';
import ConfirmationModal from '@/app/(home)/_components/confirmationmodal';
import { toast } from 'react-toastify';

export default function Contents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<{ allAddress: addressCard[] }>({
    allAddress: [],
  });
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [addressIdToDelete, setAddressIdToDelete] = useState<number | null>(
    null,
  );

  const [isSetDefaultConfirmationOpen, setIsSetDefaultConfirmationOpen] =
    useState(false);
  const [addressIdToSetDefault, setAddressIdToSetDefault] = useState<
    number | null
  >(null);

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
    setAddressIdToDelete(addressId);
    setIsConfirmationOpen(true);
  };

  const handleSetDefault = (addressId: number) => {
    setAddressIdToSetDefault(addressId);
    setIsSetDefaultConfirmationOpen(true);
  };

  const confirmSetDefault = async () => {
    if (addressIdToSetDefault !== null) {
      try {
        const res = await setDefaultAddr(addressIdToSetDefault);

        if (!res.ok) {
          throw new Error('Failed to delete address');
        }
        await fetchData();
        toast.success('The address has been set to default');
      } catch (err: any) {
        console.error('Failed to set default address:', err.message);
      } finally {
        setIsSetDefaultConfirmationOpen(false);
        setAddressIdToSetDefault(null);
      }
    }
  };

  const confirmDelete = async () => {
    if (addressIdToDelete !== null) {
      try {
        const res = await deleteAddress(addressIdToDelete);
        if (!res.ok) {
          throw new Error('Failed to delete address');
        }

        await fetchData();
        toast.success('The address has been deleted');
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setIsConfirmationOpen(false);
        setAddressIdToDelete(null);
      }
    }
  };

  const fetchData = async () => {
    try {
      const res = await getAddrList();

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
        toast.success('The address has been edited');
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
      toast.success('New address has been added');
      handleCloseModal();
    } catch (err) {
      console.error('Failed to add address:', err);
    }
  };

  return (
    <div className="p-5 lg:mx-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-main">My Addresses</h2>
        <button
          className="px-4 py-2 bg-main text-white rounded-lg shadow-lg"
          onClick={() => handleOpenModal(true)}
        >
          Add Address
        </button>
      </div>
      <div className="border-b border-gray-300 mb-4"></div>
      {data.allAddress.length > 0 ? (
        data.allAddress.map((allAddress: addressCard, idx: number) => (
          <AddrListTemplate
            key={idx}
            {...allAddress}
            onDelete={handleDelete}
            onEdit={(addressId) => {
              setEditingAddressId(addressId);
              handleOpenModal(false);
            }}
            onSetDefault={handleSetDefault}
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

      {isConfirmationOpen && (
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={confirmDelete}
          header="Confirm deletion"
          message="Are you sure you want to delete this address?"
        />
      )}
      {isSetDefaultConfirmationOpen && (
        <ConfirmationModal
          isOpen={isSetDefaultConfirmationOpen}
          onClose={() => setIsSetDefaultConfirmationOpen(false)}
          onConfirm={confirmSetDefault}
          header="Default address"
          message="Use this address as your default address?"
        />
      )}
    </div>
  );
}
