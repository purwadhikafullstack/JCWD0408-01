'use client';

import Sidebar from '@/components/sidebar/sidebar';
import { VscAccount } from 'react-icons/vsc';
import { useState } from 'react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import CreateProduct from '../_components/createproduct';
import { useParams } from 'next/navigation';
import CartListProduct from '../_components/cart-list-product';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
    const [createModalProduct, setCreateModalProduct] = useState(false);
    const params = useParams();
    console.log(params);

    const handleCreateProduct = () => {
        setCreateModalProduct(!createModalProduct);
    };

    return (
        <div id="admin-dashboard">
            <Sidebar />
            <div className="lg:ml-64">
                <div className="flex justify-start items-center gap-5 p-5">
                    <div className="flex justify-start items-center gap-5 p-10 pt-16">
                        <div>
                            <VscAccount size={64} color="grey" />
                        </div>
                        <div>
                            <h1 className="font-extrabold text-[24px]">HALLO! GOD</h1>
                            <h1>Right now you are accessing Store with ID_{params.id}</h1>
                        </div>
                    </div>
                </div>
                <p className="pl-10 font-medium text-[20px] mb-5">Product</p>
                <div className="flex flex-col gap-5 mx-10">
                    <button onClick={handleCreateProduct} className="flex flex-col">
                        <IoMdAdd size={32} className="bg-main text-secondary rounded hover:bg-secondary hover:text-main duration-300 active:bg-black" />
                    </button>
                    {createModalProduct && (
                        <div>
                            <CreateProduct />
                        </div>
                    )}
                </div>
                <CartListProduct />
                <div className="flex flex-col px-10 text-[20px] font-medium">Performance</div>
                <div className="flex flex-col justify-around items-center gap-5 p-10 pt-5">
                    <div className="flex flex-row justify-center items-center h-96 rounded-[10px] border-[1px] w-full">
                        <p>GRAPH</p>
                    </div>
                </div>
                <button>
                    <IoMdRemove
                        size={32}
                        className="bg-main text-secondary rounded hover:bg-secondary hover:text-main duration-300 active:bg-black"
                    />
                </button>
                <div className="flex flex-col pl-10 text-[20px] font-medium mt-5">
                    Quick Review
                </div>
                <div className="flex flex-col justify-around items-center gap-5 p-10 pt-5">
                    <div className="border-[1px] w-full"></div>
                    <div className="flex flex-col sm:flex-row justify-between items-center lg:gap-32 sm:gap-10 md:gap-20 gap-10">
                        <h1 className="mt-5 sm:mt-0">Total Product</h1>
                        <div className="border-[1px] sm:h-16 sm:w-0 w-64"></div>
                        <h1>Total Product Terjual</h1>
                        <div className="border-[1px] sm:h-16 sm:w-0 w-64"></div>
                        <h1 className="mb-5 sm:mb-0">Total Penjual Store</h1>
                    </div>
                    <div className="border-[1px] w-full"></div>
                </div>
                <motion.div className="flex flex-col pl-10 text-[20px] font-medium">
                    Product List
                </motion.div>
                <CartListProduct />
                <div className="flex flex-col px-10 text-[20px] font-medium">Performance</div>
                <div className="flex flex-col justify-around items-center gap-5 p-10 pt-5">
                    <div className="flex flex-row justify-center items-center h-96 rounded-[10px] border-[1px] w-full">
                        <p>GRAPH</p>
                    </div>
                </div>
            </div>
        </div>
    );
}