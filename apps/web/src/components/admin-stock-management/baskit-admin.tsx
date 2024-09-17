import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";

export default function BaskitAdmin() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="flex flex-col justify-center items-center gap-2 ">
            <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center text-[14px] items-center lg:h-10 h-60 rounded-[10px] hover:bg-secondary duration-200 hover:border-secondary border-[1px] w-full">
                <p className="p-2 lg:pl-10 ">NAMA ADMIN</p>
                <p className="">created_At</p>
                <div className="flex gap-2">
                    <p className="">stocktotal_inventory</p>
                    <p className="">pendapatan_bulanini</p>
                </div>
                <button type="button" className="" onClick={toggleModal}>
                    <IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" />
                </button>
                {isModalOpen && (
                    <div className="absolute  bg-white border rounded-[10px] shadow-lg  right-10 duration-300">
                        <ul className="">
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary cursor-pointer ">Update Admin</li>
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer">Delete Admin</li>
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer" onClick={toggleModal}>Cancel</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex w-24 justify-center items-center rounded-[24px] gap-5 h-10 mt-5 bg-secondary">
                <p><GrFormPrevious size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></p>
                <p><GrFormNext size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></p>
            </div>
        </div>
    );
}