import { useState } from "react";
import { IoIosMore } from "react-icons/io";

export default function DaftarProductDetail({nama, created_at, stocktotal_inventory, harga_product}: {nama: string, created_at: string, stocktotal_inventory: number, harga_product: number}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center text-[14px] items-center lg:h-10 h-60 rounded-[10px] hover:bg-secondary hover:border-secondary duration-200 border-[1px] w-full">
            <p className="p-2 lg:pl-10 w-[250px]">{nama}</p>
            <p className="w-[100px]">{created_at.split("T")[0]}</p>
            <div className="flex gap-2 w-[250px]">
                <p className="">{stocktotal_inventory}</p>
                <p className="">{harga_product}</p>
            </div>
            <button type="button" className="" onClick={toggleModal}>
                <IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" />
            </button>
            {isModalOpen && (
                <div className="absolute  bg-white border rounded-[10px] shadow-lg  right-10 duration-300">
                    <ul className="">
                        <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary cursor-pointer ">Update product</li>
                        <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer">Delete product</li>
                        <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer" onClick={toggleModal}>Cancel</li>
                    </ul>
                </div>
            )}
        </div>
    )
}