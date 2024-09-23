
import { useState } from "react";
import Link from "next/link";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import { set } from "cypress/types/lodash";

export default function BaskitUser() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUser, setIsModalUser] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (isModalOpen == false) {
            setIsModalUser(false);
        }
    };

    const handleUpdateUser = () => {
        setIsModalUser(!isModalUser);
        if (isModalOpen == false) {
            setIsModalUser(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-2 ">
            <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center text-[14px] items-center lg:h-10 h-60 rounded-[10px] hover:bg-secondary hover:border-secondary duration-200 border-[1px] w-full">
                <p className="p-2 lg:pl-10 ">NAMA USER</p>
                <div className="flex flex-row gap-5">
                    <p className="">created_At</p>
                    <p className="">referral_code</p>
                </div>
                <div>

                </div>
                {/* <button type="button" className="" onClick={toggleModal}>
                    <IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" />
                </button>
                {isModalOpen && (
                    <div className="absolute  bg-white border rounded-[10px] shadow-lg  right-10 duration-300">
                        <ul className="">
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer">Delete User</li>
                            <button className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary w-full cursor-pointer" onClick={toggleModal}>Cancel</button>
                        </ul>
                    </div>
                )} */}
            </div>
            <div className="flex w-24 justify-center items-center rounded-[24px] gap-5 h-10 mt-5 ">
                <p><GrFormPrevious size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></p>
                <p><GrFormNext size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></p>
            </div>
        </div>
    );
}
