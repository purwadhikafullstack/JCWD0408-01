'use client'

import Sidebar from "@/components/sidebar/sidebar";
import { VscAccount } from "react-icons/vsc";
import { SlGraph } from "react-icons/sl";
import { MdOutlineDiscount } from "react-icons/md";
import { TbPencilDiscount, TbListDetails } from "react-icons/tb";
import { useParams } from "next/navigation";
import PercentageFormDiscount from "./_components/percentage-form-discount";
import ActiveDiscount from "./_components/active-discount";
import DetailProductAdmin from "./_components/detail-product";
import NominalFormDiscount from "./_components/fix-form-discount";
import InventoryHistory from "./_components/inventory-history";
import SummaryProduct from "@/app/(home)/(sidebar_superadmin)/details-discount-management-by-super/[nama_product]/_components/summary-product";

export default function DiscountManagementPage() {
    const params = useParams()
    console.log(params)

    return (
        <div className="h-svh">
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
                    <DetailProductAdmin />
                    <div className="border-[1px] w-full border-accent"></div>
                    <div className="flex items-center gap-2">
                        <TbPencilDiscount size={24} />
                        <p>Discount Management</p>
                    </div>
                    <div className="border-[1px] w-full mb-5 border-accent"></div>
                    <div className="flex gap-10 justify-evenly font-normal">
                        <NominalFormDiscount />
                        <div className="border-[1px] "></div>
                        <PercentageFormDiscount />
                    </div>
                    <div className="flex justify-evenly">
                    </div>
                    <div className="border-[1px] w-full border-accent"></div>
                    <div className="flex items-center gap-2">
                        <MdOutlineDiscount size={24} />
                        <p>Active Discount</p>
                    </div>
                    <ActiveDiscount />
                    <InventoryHistory />
                    <div className="border-[1px] w-full border-accent"></div>
                    <div className="flex gap-2 items-center">
                        <SlGraph size={24} />
                        <p>Summary</p>
                    </div>
                    <div className="flex flex-col justify-around items-center gap-5  ">
                    <div className="flex flex-row  h-96 rounded-[10px] border-[1px] w-full">
                            <SummaryProduct />
                        </div>
                    </div>
                    <div className="border-[1px] w-full border-accent"></div>
                    <div className="border-[1px] w-full"></div>
                </div>
            </div>
        </div>
    )
}