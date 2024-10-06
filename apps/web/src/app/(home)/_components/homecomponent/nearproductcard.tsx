import { NearbyProducts } from '@/types/homeproduct';
import { formatToRupiah } from '@/utils/formatcurrency';
import Image from 'next/image';

export default function NearProductCard({
  name,
  price,
  description,
  ProductImage,
}: NearbyProducts) {
  const imageUrl = ProductImage[0]?.url; // Use the first image URL

  return (
    <div className="relative w-64 rounded-lg overflow-hidden shadow-lg bg-secondary transform transition duration-500 hover:shadow-main flex flex-col justify-between items-center group">
      <div className="p-4 flex justify-center items-center w-[240px] h-[240px]">
        <Image
          src={imageUrl}
          width={240}
          height={180}
          alt={name}
          className="object-cover rounded-lg border border-main"
        />
      </div>
      <div className="px-6 py-2 flex flex-col justify-between h-1/3">
        <div className="mb-2 text-center">
          <h3 className="font-bold text-lg text-main-black leading-tight">
            {name}
          </h3>
          <p className="text-gray-600 text-sm text-center mb-4">
            {description}
          </p>
        </div>
        <h1 className="text-xl font-bold pb-10 text-main">{formatToRupiah(price)}</h1>
      </div>
      <button className="absolute bottom-0 left-0 w-full bg-main text-white font-bold py-2 transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ease-in-out">
        See Details
      </button>
    </div>
  );
}
