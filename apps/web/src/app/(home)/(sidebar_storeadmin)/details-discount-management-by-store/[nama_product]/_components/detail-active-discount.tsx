import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { toast } from "react-toastify";

export default function ActiveDetailsDiscount({nama, value, minimum_order, type, expires_at}: {nama: string, value: number, minimum_order: number, type: string, expires_at: string}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const deleteDiscount = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}discount/delete/${nama}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            })
            if (res.status === 200 )toast.success('Discount Deleted')
        } catch (error) {
            console.log(error)
    }
}
    

    return (
        <div className="flex lg:flex-row flex-wrap font-normal text-[14px] lg:justify-between justify-center items-center lg:h-10 h-48 rounded-[10px] border-[1px] w-full">
            <p className="p-2 lg:pl-10 w-[150px]">{nama}</p>
            <div className="flex md:gap-20 gap-10 ">
                <div className="flex  items-center  gap-2 sm:w-[250px]">
                    {type === 'percentage' ? '%' : 'IDR'} {value}
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:w-[150px]">
                    <p className="font-bold">{minimum_order === null ? "No Minimum Order" : minimum_order}</p>
                </div>
                    <p>{new Date(new Date(expires_at).setDate(new Date().getDate() - 30)).toLocaleString("en-US", { timeZone: "Asia/Bangkok" })}</p>
            </div>
            <button className="" onClick={toggleModal}><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></button>
                {
                    isModalOpen && (
                        <div className="absolute  bg-white border rounded-[10px] shadow-lg  right-10 duration-300">
                            <ul className="w-full">
                                <button onClick={deleteDiscount} className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer w-full">Delete Discount</button>
                                <button className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary w-full cursor-pointer" onClick={toggleModal}>Cancel</button>
                            </ul>
                        </div>
                )}
        </div>
    )
}