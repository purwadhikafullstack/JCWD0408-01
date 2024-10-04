import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';

export default function IsiComponentCartByStoreAdmin({ name, stock, last_update }: { name: string, stock: number, last_update: number }) {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const handlebutton = () => {
    //     setIsModalOpen(!isModalOpen);
    // }

    return (
        <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full text-[14px] hover:border-secondary duration-200 ">
            <motion.p className="p-1 lg:pl-6  w-[300px]"
                initial={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
            >{name}</motion.p>
            <div className="flex md:gap-20 gap-10 ">
                <div className="flex  items-center md:pl-10 pl-6 gap-2">STOCK : {stock} </div>
                <div className="flex flex-wrap items-center gap-2 mr-5">
                    <p>LAST UPDATE :</p>
                    <div>{last_update}</div>
                </div>
            </div>
            {/* <button onClick={handlebutton}><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></button>
            {
                isModalOpen && (
                    <div className="absolute  bg-white border rounded-[10px] shadow-lg  right-10 duration-300">
                        <ul className="">
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary cursor-pointer ">Update product</li>
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer">Delete product</li>
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer" onClick={handlebutton}>Cancel</li>
                        </ul>
                    </div>
                )
            } */}
        </div>
    )
}