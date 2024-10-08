'use client'

import Sidebar from "@/components/sidebar/sidebar";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartStorebyStore from "./_components/cart-store";
import SidebarStoreAdmin from "@/components/sidebar/sidebarStoreAdmin";
import { VscAccount } from "react-icons/vsc";

interface StoreList {
    current_page: number;
    status: string;
    store: {
        store_id: number;
        store_name: string;
        created_at: string;
        updated_at: string;
        User: {
            user_id: number;
            first_name: string;
        };
    }[];
    totalPages: number;
}

export default function StoreListByStore() {
    const [data, setData] = useState<StoreList | null>(null);

    const fetchStoreList = async () => {
        try {
            const token = Cookies.get("token");
            const res = await fetch(`http://localhost:8000/api/admin/authorizestore`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
            });
            const resData = await res.json();
            console.log(resData);
            setData(resData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStoreList();
    }, []);

    return (
        <div>
            <div className="lg:ml-64">
                <div className="flex justify-start items-center gap-5 p-5">
                    <div className="flex justify-start items-center gap-5 p-10 pt-16">
                        <div className="">
                            <VscAccount size={64} color="grey" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-extrabold text-[24px]">HALLO!</h1>
                            <p className="text-[12px]">Manage your store.</p>
                        </div>
                    </div>
                </div>
                <div className="px-10">
                    <p className="text-[20px] font-bold">STORE LIST</p>
                    <div className="w-full border-[1px] mt-5"></div>
                </div>
                <div className="flex flex-wrap gap-7 px-10 py-10">
                    {data?.store?.length ? (
                        data.store.map((item, key) => (
                            <Link href={`/store-list-by-store/admin-dashboard/${item.store_id}`} key={key}>
                                <CartStorebyStore
                                    nama={item.store_name}
                                    nama_pengelola="ADMIN SAAT INI"
                                    created_at={item.created_at}
                                />
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500">No stores available</p>
                    )}
                </div>
                <div className="px-10">
                    <div className="w-full border-[1px] "></div>
                </div>
            </div>
        </div>
    );
}
