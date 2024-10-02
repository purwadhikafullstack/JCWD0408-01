'use client'

import { set } from "cypress/types/lodash";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductDetails {
    product: DataProduct,
    status: string
}

interface DataProduct {
    Inventory: [
        {
            qty: number
            total_qty: number
        }
    ],
    category: Category
    name: string,
    description: string,
    image: string,
    price: number
    product_id: number
    store_id: number
}

interface Category {
    category_name: string
}

export default function DetailProductRightBar() {
    const params = useParams()
    const [data, setData] = useState<ProductDetails | null>()
    const [quantity, setQuantity] = useState<number>()
    const [buyQuantity, setBuyQuantity] = useState<number>(0)
    const [originalQuantity, setOriginalQuantity] = useState<number>(0)

    useEffect(() => {
        if (data && data.product.Inventory.length > 0) {
            setQuantity(data.product.Inventory[0].total_qty);
            setOriginalQuantity(data.product.Inventory[0].total_qty);
        }
    }, [data]);


    const fetchDetailProduct = async () => {
        const res = await fetch(`http://localhost:8000/api/product/details/${params.id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',

        })
        const fetchData = await res.json();
        setData(fetchData)
        console.log(fetchData)
    }

    useEffect(() => {
        fetchDetailProduct()
    }, [])

    const handleAddQuantity = () => {
        if (buyQuantity < originalQuantity!) {
            setQuantity(quantity! - 1)
            setBuyQuantity(buyQuantity + 1)
        }
    }

    const handleReduceQuantity = () => {
        if (buyQuantity > 0) {
            setQuantity(quantity! + 1)
            setBuyQuantity(buyQuantity - 1)
        }
    }

    const priceMap = data?.product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    return (
        <div className="flex flex-col gap-8 w-[400px]">
            <div className="flex flex-col gap-5 items-start">
                <h1 className="text-[24px] font-bold">{data?.product?.name!}</h1>
                <p className="text-[14px] ">{data?.product.description}</p>
                <div>
                    <p className="text-[14px]">Harga Produk</p>
                    <p className="text-[14px] font-bold">Rp {priceMap}</p>
                </div>
                <div>
                    <p className="text-[14px]">Stok Produk</p>
                    <p className="text-[14px] font-bold">{quantity}</p>
                </div>
                <div className="border-[1px] w-[400px] mt-12"></div>
            </div>
            <div className=" flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-bold">Quantity</p>
                    {/* <input type="number" name="" id="" className="border-[1px] p-2 rounded-[6px] w-16" placeholder="" /> */}
                    <div className="flex gap-5 border-[1px] rounded-[6px] justify-center items-center w-[150px] text-center">
                        <button onClick={handleReduceQuantity} className="w-[50px]">-</button>
                        <p className="font-bold text-[24px] w-[50px]">{buyQuantity}</p>
                        <button onClick={handleAddQuantity} className="w-[50px]">+</button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <button className="border-main border-[1px] text-main rounded-[6px] p-2 duration-300 active:scale-95">Add to Cart</button>
                    <button
                        className="bg-main text-white rounded-[6px] p-2  duration-300 active:scale-95"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}