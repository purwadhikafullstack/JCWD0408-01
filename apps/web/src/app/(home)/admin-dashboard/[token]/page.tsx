import Sidebar from "@/components/admin-dashboard/sidebar"
import { VscAccount } from "react-icons/vsc";
import { IoIosMore } from "react-icons/io";
import { FaAngleUp, FaAngleDown  } from "react-icons/fa";
import { GrFormPrevious,  GrFormNext } from "react-icons/gr";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div id="admin-dashboard">
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
                <div className="flex flex-col pl-10 text-[20px] font-medium" >Quick Review</div>
                <div className="flex flex-col justify-around items-center gap-5 p-10 pt-5">
                    <div className="border-[1px] w-full"></div>
                    <div className="flex flex-col sm:flex-row justify-between items-center lg:gap-32 sm:gap-10 md:gap-20 gap-10">
                        <h1 className="mt-5 sm:mt-0">Total Product</h1>
                        <div className="border-[1px] sm:h-16 sm:w-0 w-64 "></div>
                        <h1>Total Product Terjual</h1>
                        <div className="border-[1px] sm:h-16 sm:w-0 w-64 "></div>
                        <h1 className="mb-5 sm:mb-0">Total Penjual Store</h1>
                    </div>
                    <div className="border-[1px] w-full"></div>
                </div>
                <div className="flex flex-col pl-10  text-[20px] font-medium" >Product List</div>
                <div className="flex flex-col justify-around items-center gap-5 p-10 pt-5">
                    <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full">
                        <p className="p-2 lg:pl-10 ">NAMA PRODUCT NYA</p>
                        <div className="flex md:gap-20 gap-10 ">
                            <div className="flex  items-center md:pl-10 pl-6 gap-2">
                                STOCK : 100
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <p>LAST UPDATE :</p>
                                <div>NAIK</div>
                                <div><FaAngleUp size={32} className="text-main " /></div>
                                <div>TURUN</div>
                                <div><FaAngleDown size={32} className="text-red-900 " /></div>
                            </div>
                        </div>
                        <Link href='/details-discount-management' className=""><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></Link>
                    </div>
                    <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full">
                        <p className="p-2 lg:pl-10 ">NAMA PRODUCT NYA</p>
                        <div className="flex md:gap-20 gap-10 ">
                            <div className="flex  items-center md:pl-10 pl-6 gap-2">
                                STOCK : 100
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <p>LAST UPDATE :</p>
                                <div>NAIK</div>
                                <div><FaAngleUp size={32} className="text-main " /></div>
                                <div>TURUN</div>
                                <div><FaAngleDown size={32} className="text-red-900 " /></div>
                            </div>
                        </div>
                        <Link href='/details-discount-management' className=""><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></Link>
                    </div>
                    <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full">
                        <p className="p-2 lg:pl-10 ">NAMA PRODUCT NYA</p>
                        <div className="flex md:gap-20 gap-10 ">
                            <div className="flex  items-center md:pl-10 pl-6 gap-2">
                                STOCK : 100
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <p>LAST UPDATE :</p>
                                <div>NAIK</div>
                                <div><FaAngleUp size={32} className="text-main " /></div>
                                <div>TURUN</div>
                                <div><FaAngleDown size={32} className="text-red-900 " /></div>
                            </div>
                        </div>
                        <Link href='/details-discount-management' className=""><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></Link>
                    </div>
                    <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full">
                        <p className="p-2 lg:pl-10 ">NAMA PRODUCT NYA</p>
                        <div className="flex md:gap-20 gap-10 ">
                            <div className="flex  items-center md:pl-10 pl-6 gap-2">
                                STOCK : 100
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <p>LAST UPDATE :</p>
                                <div>NAIK</div>
                                <div><FaAngleUp size={32} className="text-main " /></div>
                                <div>TURUN</div>
                                <div><FaAngleDown size={32} className="text-red-900 " /></div>
                            </div>
                        </div>
                        <Link href='/details-discount-management' className=""><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></Link>
                    </div>
                    <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full">
                        <p className="p-2 lg:pl-10 ">NAMA PRODUCT NYA</p>
                        <div className="flex md:gap-20 gap-10 ">
                            <div className="flex  items-center md:pl-10 pl-6 gap-2">
                                STOCK : 100
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <p>LAST UPDATE :</p>
                                <div>NAIK</div>
                                <div><FaAngleUp size={32} className="text-main " /></div>
                                <div>TURUN</div>
                                <div><FaAngleDown size={32} className="text-red-900 " /></div>
                            </div>
                        </div>
                        <Link href='/details-discount-management' className=""><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></Link>
                    </div>

                    <div className="flex border-[1px] w-24 justify-center items-center rounded-[24px] gap-5 h-10">
                        <p><GrFormPrevious size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full"/></p>
                        <p><GrFormNext size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full"/></p>
                    </div>
                </div>
                <div className="flex flex-col px-10  text-[20px] font-medium" >Performance</div>
                <div className="flex flex-col justify-around items-center gap-5 p-10 pt-5 ">
                    <div className="flex flex-row justify-center items-center h-96 rounded-[10px] border-[1px] w-full">
                        <p>GRAPH</p>
                    </div>
                </div>
            </div>
        </div>
    )
}