'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import { motion } from "framer-motion";

interface Product {
    name: string;
    price: number;
    description: string;
    product_id: number;
}

interface Data {
    product: Product[];
    totalPages: number;
}

export default function CartListProduct() {
    const [data, setData] = useState<Data | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const params = useParams()
    console.log(params)

    const handlebutton = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleNext = () => {
        if (page  === data?.totalPages) {
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
        const res = await fetch(`http://localhost:8000/api/product/${params.id}?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });
        const data = await res.json();
        console.log(data);
        setData(data)
    }

    useEffect(() => {
        fetchProduct();
    }, [page]);

    // console.log(page)

    return (
        <motion.div className="flex flex-col justify-around items-center gap-5 p-10 pt-5"
        >
            {
                data?.product.map((item: any) => {
                    return (
                        <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full">
                <motion.p className="p-2 lg:pl-10  w-[300px]"
                initial={{ opacity: 0 , translateX: -10}}
                animate={{ opacity: 1, translateX: 0}}
                >{item.name}</motion.p>
                <div className="flex md:gap-20 gap-10 ">
                    <div className="flex  items-center md:pl-10 pl-6 gap-2">STOCK : 100 </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <p>LAST UPDATE :</p>
                        <div>NAIK</div>
                        <div><FaAngleUp size={32} className="text-main " /></div>
                        <div>TURUN</div>
                        <div><FaAngleDown size={32} className="text-red-900 " /></div>
                    </div>
                </div>
                <button onClick={handlebutton}><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></button>
                {
                    isModalOpen && (
                        <div className="absolute  bg-white border rounded-[10px] shadow-lg  right-10 duration-300">
                            <ul className="">
                                <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary cursor-pointer ">Update product</li>
                                <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer">Delete product</li>
                                <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer" onClick={handlebutton}>Cancel</li>
                            </ul>
                        </div>
                    )
                }
            </div>
                    )
                })
            }
            <div className="flex border-[1px] w-24 justify-center items-center rounded-[24px] gap-5 h-10">
                <button onClick={handlePrev}><GrFormPrevious size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
                <button onClick={handleNext}><GrFormNext size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
            </div>
        </motion.div>
    )
}