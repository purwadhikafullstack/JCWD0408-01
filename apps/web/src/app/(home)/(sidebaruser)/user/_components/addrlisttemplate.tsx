import { useState } from 'react';
import { addressCard } from '@/types/address';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

interface AddrListTemplateProps extends addressCard {
  onDelete: (addressId: number) => void;
  onEdit: (addressId: number) => void; 
}

export default function AddrListTemplate({
  address,
  subdistrict,
  city,
  province,
  postcode,
  address_id,
  onDelete,
  onEdit
}: AddrListTemplateProps) {
  const handleEdit = () => {
    onEdit(address_id); // Call the onEdit function when the edit button is clicked
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 md:p-6 rounded-lg shadow-lg w-full mb-8">
      <div className="w-full md:max-w-lg p-4 border border-gray-300 rounded-md bg-gray-100 mb-4 md:mb-0">
        <p className="text-main-black font-medium">
          {address}
        </p>
        <hr className="my-2 border-gray-700" />
        <p className="text-gray-600">
          {subdistrict ? `${subdistrict}` : ''}
          {subdistrict && city ? `, ` : ''}
          {city ? `${city}` : ''}
          {(subdistrict || city) && province ? `, ` : ''}
          {province ? `${province}` : ''}
          {province && postcode ? `, ` : ''}
          {postcode ? `${postcode}` : ''}
        </p>
      </div>
      <div className="flex flex-col space-y-2 w-full md:w-auto">
        <button className="w-full md:w-auto px-4 py-2 bg-main text-white rounded-md shadow hover:bg-main-black transition duration-200">
          Set as Default
        </button>
        <div className='flex gap-2'>
          <button
            className="w-full md:w-32 px-4 py-2 bg-accent text-white rounded-md shadow flex items-center justify-center space-x-2 hover:bg-blue-600 transition duration-200"
            onClick={handleEdit}
          >
            <FaPencilAlt /> 
            <span>Edit</span>
          </button>
          <button
            className="w-full md:w-32 px-4 py-2 bg-maroon text-white rounded-md shadow flex items-center justify-center space-x-2 hover:bg-red-600 transition duration-200"
            onClick={() => onDelete(address_id)} 
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
