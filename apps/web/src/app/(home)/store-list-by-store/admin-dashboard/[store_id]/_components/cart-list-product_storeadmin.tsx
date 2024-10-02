'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { motion } from "framer-motion";
import IsiComponentCart from "./isi-component-cart_storeadmin";
import Link from "next/link";

interface Product {
    name: string;
    price: number;
    description: string;
    product_id: number;
    Inventory: [
        {
            qty: number;
            total_qty: number;
        }
    ];
    totalProducts: number;
}

interface Data {
    product: Product[];
    totalPages: number;
}

export default function CartListProductByStoreAdmin() {
    const [data, setData] = useState<Data | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const params = useParams()

    const handlebutton = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleNext = () => {
        if (page === data?.totalPages) {
            return;
        }
        setPage(page + 1)
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const fetchProduct = async () => {
        const res = await fetch(`http://localhost:8000/api/product/${params.store_id}?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });
        const data = await res.json();
        console.log(data);
        console.log(params.store_id)
        setData(data)
    }

    useEffect(() => {
        fetchProduct();
    }, [page]);

    // console.log(page)
    const splitter = (params.store_id).toString().split("%")[0]
    // const splitterProduct_id = 

    return (
        <div className="">
            <div className="flex flex-col pl-10 text-[20px] font-medium" >Quick Review</div>
            <div className="flex flex-col justify-around items-center gap-5 p-10 pt-5">
                <div className="border-[1px] w-full"></div>
                <div className="flex flex-col sm:flex-row justify-between items-center lg:gap-32 sm:gap-10 md:gap-20 gap-10">
                    <h1 className="mt-5 sm:mt-0 text-[32px] font-medium">{data?.product.length} <span className="text-[14px] font-light">Items</span></h1>
                    <div className="border-[1px] sm:h-16 sm:w-0 w-64 "></div>
                    <h1>Total Product Terjual</h1>
                    <div className="border-[1px] sm:h-16 sm:w-0 w-64 "></div>
                    <h1 className="mb-5 sm:mb-0">Total Penjual Store</h1>
                </div>
                <div className="border-[1px] w-full"></div>
            </div>
            <div className="flex flex-col pl-10  text-[20px] font-medium" >Product List</div>
            <motion.div className="flex flex-col justify-around items-center gap-5 p-10 w-full"
            >
                {
                    data?.product.map((item: Product, key: any) => {
                        return (
                            <Link href={`/details-discount-management/${item.product_id}`} className="flex lg:flex-row flex-wrap lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full hover:bg-secondary hover:border-secondary duration-200" key={key}>
                                <IsiComponentCart name={item?.name} stock={item.Inventory[0]?.total_qty}  last_update={item.Inventory[0]?.qty} />
                            </Link>
                        )
                    })
                }
                <div className="flex border-[1px] w-24 justify-center items-center rounded-[24px] gap-5 h-10">
                    <button onClick={handlePrev}><GrFormPrevious size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
                    <button onClick={handleNext}><GrFormNext size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
                </div>
            </motion.div>
        </div>
    )
}