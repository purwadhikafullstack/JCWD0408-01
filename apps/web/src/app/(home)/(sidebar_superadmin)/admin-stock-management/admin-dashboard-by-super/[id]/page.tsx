'use client';

import Sidebar from '@/components/sidebar/sidebar';
import { VscAccount } from 'react-icons/vsc';
import { useEffect, useState } from 'react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import CreateProduct from '../_components/createproduct';
import { useParams } from 'next/navigation';
import CartListProduct from '../_components/cart-list-product';
import { motion } from 'framer-motion';


interface Product {
    product_id: number;
    name: string;
    category_id: number;
}

interface OrderItem {
    product: Product;
    qty: number;
}

interface Order {
    user_id: number;
    total_price: number;
    OrderItem: OrderItem[];
    created_at: string;
}

interface TransactionResponse {
    status: string;
    msg: string;
    order: Order[];
    totalRavenue: number;
    totalItem: number;
    totalQty: number;
}

export default function AdminDashboard() {
    const [createModalProduct, setCreateModalProduct] = useState(false);
    const params = useParams();
    const [transaction, setTransaction] = useState<TransactionResponse | null>(null);
    console.log(params);

    const handleCreateProduct = () => {
        setCreateModalProduct(!createModalProduct);
    };

    useEffect(() => {
        fetchTransaction();
    }, []);

    const fetchTransaction = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/transaction/${params.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });
            const data = await res.json();
            setTransaction(data);
            console.log(data);
        } catch (error) {
            console.error('Failed to fetch transaction', error);
        }
    };

    const convertIdr = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
    };

    return (
        <div id="admin-dashboard">
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
                    <div className="flex flex-col justify-center items-center h-96 rounded-[10px] border-[1px] p-2  w-full">
                        <div className="mb-5">LAST 5 TRANSACTION</div>
                        {
                            transaction?.order?.length ? (
                                transaction.order.slice(0, 5).map((item: Order, key: number) => (
                                    <div key={key} className="flex border-[1px] rounded-[10px] justify-between  p-2 m-2 gap-5 w-full">
                                        <p>User ID: {item.user_id}</p>
                                        <p>Total Qty: {item.OrderItem.reduce((total, orderItem) => total + orderItem.qty, 0)}</p>
                                        <p>Transaction : {item.created_at.split("T")[0].replace("T", " ")}</p>
                                        <p>Total Price: {convertIdr(item.total_price)}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No transactions available</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

