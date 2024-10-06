import { FaPencilAlt, FaTrash } from 'react-icons/fa';

export default function CartStore({
  store_name,
  store_admin,
  address,
  city,
  province,
}: {
  store_name: string;
  store_admin: string;
  address: string;
  city: string;
  province: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-5 bg-secondary p-4 md:p-6 rounded-lg shadow-lg w-80 h-80 mb-8 hover:border-main hover:bg-gray-100 duration-200 hover:scale-105">
      <div className="w-full p-4 border border-gray-300 rounded-md bg-gray-100 mb-4">
        <p className="text-main-black font-bold text-[18px] hover:text-[20px] duration-200">
          {store_name}
        </p>
        <hr className="my-2 border-gray-700" />
        <p className="text-gray-600 text-[14px]">{address}</p>
        <p className="text-gray-600 text-[14px]">
          {city}, {province}
        </p>
      </div>
      <div className="text-[14px] flex text-gray-600">
        <p>Store Admin: </p>
        <p className="text-[14px] font-bold">{store_admin}</p>
      </div>
      <div className='flex gap-10'>
        <button className="w-20 px-4 py-2 bg-accent text-white rounded-md shadow flex items-center justify-center space-x-2 hover:bg-blue-600 transition duration-200">
          <FaPencilAlt />
        </button>
        <button className="w-20 px-4 py-2 bg-maroon text-white rounded-md shadow flex items-center justify-center space-x-2 hover:bg-red-600 transition duration-200">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
