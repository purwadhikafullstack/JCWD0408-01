'use client'

import { IoIosMore } from "react-icons/io";
import { useState } from "react";

export default function CategoryProductDetail({ nama, registered_product }: { nama: string, registered_product: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center text-[14px] items-center lg:h-10 h-60 rounded-[10px] hover:bg-secondary hover:border-secondary duration-200 border-[1px] w-full">
            <p className="p-2 lg:pl-10 w-[150px] ">{nama}</p>
            <span className="w-[200px]">Used on <span className="font-bold">{registered_product}</span> product</span>
            <button type="button" className="" onClick={toggleModal}>
                <IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" />
            </button>
            {isModalOpen && (
                <div className="absolute bg-white border rounded-[10px] shadow-lg  w-[200px] right-10 duration-300">
                    <ul className="">
                        {registered_product === 0 && (
                            <li className="p-2 hover:bg-secondary rounded-[6px] duration-200 hover:text-main cursor-pointer">Delete Category</li>
                        )}
                        <li className="p-2 hover:bg-secondary rounded-[6px]  duration-200 hover:text-main  cursor-pointer" onClick={toggleModal}>Cancel</li>
                    </ul>
                </div>
            )}
        </div>
    )
}