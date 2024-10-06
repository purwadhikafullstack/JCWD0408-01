'use client'

import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
// import CartStore from "@/components/admin-dashboard/cart-store";
import { useEffect, useState } from "react";
import CartStore from "./_components/cart-store";
import { GrFormNext, GrFormPrevious, GrUserAdmin } from "react-icons/gr";
import Link from "next/link";

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
        }
    }[]
    totalPages: number;
}

export default function StoreListBySuper() {
    const [data, setData] = useState<StoreList | null>(null);
    const [page, setPage] = useState(1);

    const fetchStoreList = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/superadmin/store?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })
            const resData = await res.json()
            console.log(data)
            setData(resData)
        } catch (error) {
            console.log(error)
        }
    }

    const handleNext = () => {
        if (data?.current_page === data?.totalPages) {
            return;
        }
        setPage(page + 1)
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    useEffect(() => {
        fetchStoreList()
    }, [page])

    console.log(data)

    return (
        <div>
            <div className="lg:ml-64">
                <div className="flex justify-start items-center gap-5 p-5">
                    <div className="flex justify-start items-center gap-5 p-10 pt-16">
                        <div className="">
                        <GrUserAdmin size={60} color="grey"/>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-extrabold text-[24px]">HALLO! Master Admin</h1>
                            <p className="text-[12px]">Welcome to management system</p>
                        </div>
                    </div>
                </div>
                <div className="px-10">
                    <p className="text-[20px] font-bold">STORE LIST</p>
                    <div className="w-full border-[1px] mt-5"></div>
                </div>
                <div className="flex flex-wrap gap-7 px-10 py-10">
                    {
                        data?.store.map((item, key) => {
                            return (
                                <Link href={`/admin-stock-management/admin-dashboard-by-super/${item.store_id}`} >
                                    <CartStore key={key} nama={item.store_name} nama_pengelola={item.User?.first_name} created_at={item.created_at} />
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="flex justify-center items-center rounded-[24px] gap-5 h-10  w-full">
                    <button onClick={handlePrev}><GrFormPrevious size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
                    <button onClick={handleNext}><GrFormNext size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
                </div>
                <div className="px-10">

                    <div className="w-full border-[1px] mt-5"></div>
                </div>
            </div>
        </div>

    )
}