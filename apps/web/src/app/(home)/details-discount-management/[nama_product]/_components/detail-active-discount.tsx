import { IoIosMore } from "react-icons/io";

export default function ActiveDetailsDiscount({nama, value, minimum_order, type, expires_at}: {nama: string, value: number, minimum_order: number, type: string, expires_at: string}) {
    return (
        <div className="flex lg:flex-row flex-wrap font-normal text-[14px] lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full">
            <p className="p-2 lg:pl-10 w-[150px]">{nama}</p>
            <div className="flex md:gap-20 gap-10 ">
                <div className="flex  items-center  gap-2 w-[250px]">
                    DISCOUNT VALUE : {type === 'percentage' ? '%' : 'IDR'} {value}
                </div>
                <div className="flex flex-wrap items-center gap-2 w-[150px]">
                    <p className="font-bold">{minimum_order === null ? "No Minimum Order" : minimum_order}</p>
                </div>
                    <p>{expires_at.split("T")[0]}</p>
            </div>
            <button className=""><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></button>
        </div>
    )
}