'use client';

import React, { useState } from 'react';

import { Formik, Form } from 'formik';
import { Input } from '@/components/inputformik';
import { StoreData, StoreAddress } from '@/types/superadmin';
import { createStoreSchema } from '@/libs/schema';
import { createStore } from '@/libs/action/superadmin';

import { toast } from 'react-toastify';
import Modal from '@/app/(home)/_components/map/modal';
import AddrMap from '@/app/(home)/_components/map/addrmap';

const initialValues = {
  store_name: '',
};

const initialStoreData: StoreData = {
  store_name: '',
  address: '',
  city: '',
  city_id: '',
  province: '',
  province_id: '',
  postcode: '',
  latitude: 0,
  longitude: 0,
};

export default function CreateStore() {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isAddrMapModalOpen, setIsAddrMapModalOpen] = useState(false);
  const [storeData, setStoreData] = useState<StoreData>(initialStoreData);

  const handleOpenStoreModal = () => {
    setIsStoreModalOpen(true);
  };

  const handleCloseStoreModal = () => {
    setIsStoreModalOpen(false);
    setStoreData(initialStoreData); // Reset store data when closing the modal
  };

  const handleOpenAddrMapModal = () => {
    setIsAddrMapModalOpen(true);
  };

  const handleCloseAddrMapModal = () => {
    setIsAddrMapModalOpen(false);
  };

  const handleAddrMapSubmit = async (data: StoreAddress): Promise<void> => {
    setStoreData((prevState) => ({
      ...prevState,
      ...data,
    }));
    handleCloseAddrMapModal(); // Close the AddrMap modal after submission
  };

  const handleSubmit = async (values: { store_name: string }) => {
    // Prevent submission if address fields are empty
    if (!storeData.address || !storeData.city || !storeData.province) {
      toast.error('Please add the address');
      return;
    }

    try {
      const dataToSubmit = {
        ...storeData,
        store_name: values.store_name, // Add store name to the submission
      };
      await createStore(dataToSubmit);
      console.log('Store created with data:', dataToSubmit);
      handleCloseStoreModal(); // Close the store modal after submission
    } catch (error) {
      console.error('Failed to create store:', error);
    }
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-main text-white rounded-lg shadow-lg"
        onClick={handleOpenStoreModal}
      >
        Create Store
      </button>

      {isStoreModalOpen && (
        <Modal closeModal={handleCloseStoreModal}>
          <h2 className="text-lg font-bold">Create a New Store</h2>

          <Formik
            initialValues={initialValues} // Use the updated initial values
            validationSchema={createStoreSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="store_name" className="block mb-2">
                    Store Name
                  </label>
                  <Input name="store_name" type="text" />
                </div>

                <label htmlFor="address" className="block mb-2">
                  Address
                </label>
                <div className="flex items-center gap-1">
                  {storeData.address ? (
                    <>
                      <span className="text-main font-bold">
                        {storeData.address}, {storeData.city}, {storeData.province}
                      </span>
                      <p> (Selected)</p>
                      <button
                        type="button" // Use a button instead of submit
                        className="text-blue-500 underline ml-2"
                        onClick={handleOpenAddrMapModal} // Open AddrMap modal for editing
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button" // Use a button instead of submit
                        className="text-main font-bold underline"
                        onClick={handleOpenAddrMapModal} // Open AddrMap modal
                      >
                        Click here
                      </button>
                      <p>to add address</p>
                    </>
                  )}
                </div>

                <div className="flex justify-center mt-20">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-main text-white rounded-lg shadow-lg"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}

      {isAddrMapModalOpen && (
        <Modal closeModal={handleCloseAddrMapModal}>
          <AddrMap
            closeModal={handleCloseAddrMapModal}
            submitFunction={handleAddrMapSubmit} // Handle submission here
          />
        </Modal>
      )}
    </div>
  );
}
