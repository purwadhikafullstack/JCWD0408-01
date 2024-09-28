import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { MdOutlineTransitEnterexit } from "react-icons/md";

export default function AdminCartDetails({store_admin, created_At, stocktotal_inventory, pendapatan_bulanini,store} : {store_admin: string, created_At: string, stocktotal_inventory: string, pendapatan_bulanini: string, store : string}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateAdmin, setIsModalUpdateAdmin] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleUpdateAdmin = () => {
        setIsModalUpdateAdmin(!isModalUpdateAdmin);
    }

    return (
        <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center text-[14px] items-center lg:h-10 h-60 rounded-[10px] hover:bg-secondary duration-200 hover:border-secondary border-[1px] w-full">
                <p className="p-2 lg:pl-10 ">{store_admin}</p>
                <p>{created_At.split('T')[0]}</p>
                <p className="">Store : {store}</p>
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
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary cursor-pointer " onClick={handleUpdateAdmin}>Update Admin</li>
                            {
                                isModalUpdateAdmin && (
                                    <div className="flex flex-col absolute bg-white border rounded-[10px] shadow-lg -left-64 -top-20 duration-300 p-5">
                                        <div className="flex items-center justify-between">
                                            <div>UPDATE ADMIN</div>
                                            <button onClick={toggleModal}>
                                                <MdOutlineTransitEnterexit size={32} className="text-main hover:text-secondary duration-300" />
                                            </button>
                                        </div>
                                        <input type="text" placeholder="Email" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                        <input type="text" placeholder="Password" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                        <input type="text" placeholder="Branch Name" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                        <input type="text" placeholder="Phone" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                        <input type="text" placeholder="Address" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                        <button className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer mt-2">Update User</button>
                                    </div>
                                )
                            }
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer">Delete Admin</li>
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer" onClick={toggleModal}>Cancel</li>
                        </ul>
                    </div>
                )}
            </div>
    )
}