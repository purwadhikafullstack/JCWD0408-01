import Sidebar from "@/components/admin-dashboard/sidebar";
import Discount from "@/components/discount-management/list-discount";
import Image from "next/image";
import Link from "next/link";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { SlGraph } from "react-icons/sl";
import { MdOutlineDiscount } from "react-icons/md";
import { TbPencilDiscount } from "react-icons/tb";
import { TbListDetails } from "react-icons/tb";



export default function DiscountManagementPage() {
    return (
        <div className="h-svh">
            <Sidebar />
            <div className="lg:ml-64">
                <div className="flex justify-start items-center gap-5 p-5">
                    <div className="flex justify-start items-center gap-5 p-10 pt-16">
                        <div className="">
                            <VscAccount size={64} color="grey" />
                        </div>
                        <div>
                            <h1 className="font-extrabold text-[24px]">HALLO!</h1>
                            <h1>Admin $ID</h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-10 text-[20px] font-medium gap-5">
                    <div className="flex items-center gap-2">
                    <TbListDetails size={24} />
                    <p>Details</p>
                    </div>
                    <div className="border-[1px] w-full border-accent"></div>
                    <div className="flex justify-start gap-10  ">
                        <div className="flex flex-col justify-evenly">
                            <h1>JUDUL PRODUCT</h1>
                            <p className="text-[16px] text-justify text-balance lg:w-[650px] font-normal">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus amet obcaecati atque exercitationem voluptatibus impedit facilis sequi sed, aliquam vitae adipisci! Vero, obcaecati iure doloremque sapiente, eveniet qui facilis accusamus omnis porro, minus ea consequatur. Dolorem nemo excepturi, quaerat dolore consequuntur ipsum! Veniam nihil animi, recusandae porro provident expedita labore pariatur ab quo possimus error aspernatur? Maiores sequi sit alias nihil quos sapiente quisquam odio perspiciatis veniam ipsa, corrupti hic reiciendis aliquam distinctio laudantium, vel nobis at sint quia.</p>
                            <div className="flex text-[16px] gap-5 ">
                                <p className="bg-main text-secondary p-2 rounded-[6px]">Price : Rp. 100.000</p>
                                <p className="bg-main text-secondary p-2 rounded-[6px]">Stock : 100</p>
                            </div>
                        </div>
                        <p className="">
                            <Image src="/dummy-image.jpg" alt="Discount" width={230} height={300} className="rounded-[10px]" />
                        </p>
                    </div>
                    <div className="border-[1px] w-full border-accent"></div>
                    <div className="flex items-center gap-2">
                    <TbPencilDiscount size={24} />
                    <p>Discount Management</p>
                    </div>
                    <div className="border-[1px] w-full mb-5 border-accent"></div>
                    <div className="flex gap-10 justify-evenly font-normal">
                        <div className="flex flex-col gap-2 text-[16px]">
                            <p className="font-medium">Nominal Discount</p>
                            <div className="border-[1px] w-full "></div>
                            <div className="flex justify-between gap-5">
                                <p>Name</p>
                                <p>DISC10%</p>
                            </div>
                            <div className="flex justify-between gap-5">
                                <p>Cuts</p>
                                <p>100000</p>
                            </div>
                            <div className="flex justify-between gap-5">
                                <p>Quota</p>
                                <p>1000</p>
                            </div>
                            <p className="text-gray-300">Expire Date</p>
                            <div className="flex gap-10">
                                <p>From</p>
                                <p>To</p>
                            </div>
                            <button className=" text-main hover:text-secondary duration-300 hover:bg-main rounded-full w-72 h-10 m-2 mt-4 bg-secondary font-normal">Apply Discount</button>
                        </div>
                        <div className="border-[1px] "></div>
                        <div className="flex flex-col gap-2 text-[16px]">
                            <p className="font-medium">Percentage Discount</p>
                            <div className="border-[1px] w-full "></div>
                            <div className="flex justify-between gap-5">
                                <p>Name</p>
                                <p>DISC10%</p>
                            </div>
                            <div className="flex justify-between gap-5">
                                <p>Percent</p>
                                <p>10</p>
                            </div>
                            <div className="flex justify-between gap-5">
                                <p>Quota</p>
                                <p>1000</p>
                            </div>
                            <p className="text-gray-300">Expire Date</p>
                            <div className="flex gap-10">
                                <p>From</p>
                                <p>To</p>
                            </div>
                            <button className=" text-main hover:text-secondary duration-300 hover:bg-main rounded-full w-72 h-10 m-2 mt-4 bg-secondary font-normal">Apply Discount</button>
                        </div>
                    </div>
                    <div className="flex justify-evenly">
                    </div>
                    <div className="border-[1px] w-full border-accent"></div>
                    <div className="flex items-center gap-2">
                    <MdOutlineDiscount size={24} />
                    <p>Active Discount</p>
                    </div>
                    <div className="flex lg:flex-row flex-wrap font-normal text-[14px] lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full">
                        <p className="p-2 lg:pl-10 ">NAMA DISCOUNTNYA</p>
                        <div className="flex md:gap-20 gap-10 ">
                            <div className="flex  items-center md:pl-10 pl-6 gap-2">
                                DISCOUNT VALUE : 10%
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <p>QUOTA : 10</p>
                            </div>
                        </div>
                        <button className=""><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></button>
                    </div>
                    <div className="flex lg:flex-row flex-wrap font-normal text-[14px] lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full">
                        <p className="p-2 lg:pl-10 ">NAMA DISCOUNTNYA</p>
                        <div className="flex md:gap-20 gap-10 ">
                            <div className="flex  items-center md:pl-10 pl-6 gap-2">
                                DISCOUNT VALUE : 10%
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <p>QUOTA : 10</p>
                            </div>
                        </div>
                        <button className=""><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></button>
                    </div>
                    <div className="flex lg:flex-row flex-wrap font-normal text-[14px] lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full">
                        <p className="p-2 lg:pl-10 ">NAMA DISCOUNTNYA</p>
                        <div className="flex md:gap-20 gap-10 ">
                            <div className="flex  items-center md:pl-10 pl-6 gap-2">
                                DISCOUNT VALUE : 10%
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <p>QUOTA : 10</p>
                            </div>
                        </div>
                        <button className=""><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></button>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="flex border-[1px] w-24 justify-center items-center rounded-[24px] gap-5 h-10">
                            <p><GrFormPrevious size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></p>
                            <p><GrFormNext size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></p>
                        </div>
                    </div>
                    <div className="border-[1px] w-full border-accent"></div>
                    <div className="flex gap-2 items-center">
                        <SlGraph  size={24}/>
                        <p>Summary</p>
                    </div>
                    <div className="flex flex-col justify-around items-center gap-5  ">
                        <div className="flex flex-row justify-center items-center h-96 rounded-[10px] border-[1px] w-full">
                            <p>GRAPH</p>
                        </div>
                    </div>
                    <div className="border-[1px] w-full border-accent"></div>
                    <div className="border-[1px] w-full"></div>
                </div>
            </div>
        </div>
    )
}