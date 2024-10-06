import Sidebar from "@/components/sidebar/sidebar"
import { VscAccount } from "react-icons/vsc";
import { IoIosMore } from "react-icons/io";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Link from "next/link";
import SidebarStoreAdmin from "@/components/sidebar/sidebarStoreAdmin";
import CartListProductByStoreAdmin from "./_components/cart-list-product_storeadmin";

export default function AdminDashboard() {
    return (
        <div id="admin-dashboard">
            <SidebarStoreAdmin />
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
                <CartListProductByStoreAdmin />
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