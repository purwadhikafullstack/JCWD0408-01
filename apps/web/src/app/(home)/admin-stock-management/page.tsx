'use client'

import Sidebar from "@/components/admin-dashboard/sidebar";
import BaskitAdmin from "@/components/admin-stock-management/baskit-admin";
import BaskitUser from "@/components/admin-stock-management/baskit-user";
import CategoryProduct from "@/components/admin-stock-management/category-product";
import DaftarProduct from "@/components/admin-stock-management/daftar-product";
import Image from "next/image";
import { useState } from "react";
import { SlGraph } from "react-icons/sl";

export default function AdminStockManagement() {

    const tabs = [
        { name: "Baskit User", content: <div className="py-5"><BaskitUser/></div> },
        { name: "Baskit Admin", content: <div className="py-5"><BaskitAdmin/></div> },
        { name: "Daftar Product", content: <div className="py-5"><DaftarProduct/></div> },
        { name: "Category Product", content: <div className="py-5"><CategoryProduct/></div> },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].name);

    return (
        <div id="super-admin">
            <Sidebar />
            <div className="lg:ml-64">
                <div className="flex justify-start items-center gap-5 p-5">
                    <div className="flex justify-start items-center gap-5 p-10 pt-16">
                        <div className="">
                            <Image src="/GM.jpeg" alt="About Us" width={72} height={64} className='rounded-[10px]' />
                        </div>
                        <h1 className="font-extrabold text-[24px]">HALLO! GOD</h1>
                    </div>
                </div>
                <div className="flex flex-col pl-10 text-[20px] font-medium" >Overview</div>
                <div className="p-10">
                    <div className="border-[1px] w-full mb-5"></div>
                    <div className="flex justify-center gap-10 mb-4 rounded-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                className={`px-4 py-2 duration-300 rounded w-60 ${activeTab === tab.name ? "bg-main text-white" : "bg-white"}`}
                                onClick={() => setActiveTab(tab.name)}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>
                    <div className="">
                        {tabs.find((tab) => tab.name === activeTab)?.content}
                        <div className="border-[1px] w-full border-accent mb-5"></div>
                    </div>
                    <div className=" flex flex-col gap-5 text-[20px] mb-5">
                        <div className="flex gap-2 items-center ">
                            <SlGraph size={24} />
                            <p>Summary Global</p>
                        </div>
                        <div className="">
                            <div className="flex flex-col justify-around items-center gap-5  ">
                                <div className="flex flex-row justify-center items-center h-96 rounded-[10px] border-[1px] w-full">
                                    <p>GRAPH</p>
                                </div>
                            </div>
                            <div className="border-[1px] w-full border-accent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
