'use client'

import DetailProductRightBar from "@/components/detail-product/details";
import RecomendedItemsBottom from "@/components/detail-product/recomended-items";
import Image from "next/image";
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
    price: number
    product_id: number
    store_id: number
    ProductImage : [
        {
            url: string
        }
    ]
}

interface Category {
    category_name: string
}

export default function DetailsProductByUser() {
    const params = useParams()
    const [data, setData] = useState<ProductDetails | null>()

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

    return (
        <div>
        <div className="flex flex-wrap justify-center items-start gap-10 p-5 mt-28">
                <div>
                    {
                        data && data?.product?.ProductImage?.length > 0 && (
                            <div className="flex flex-col flex-wrap justify-center gap-10 ">
                                <Image src={data?.product.ProductImage[0]?.url || '/fallback-image.jpg'} alt="Product" width={500} height={300} className="rounded-[6px] mb-4 hover:scale-110 duration-300" />
                                <div className="flex gap-10 items-center justify-center ">
                                    {data?.product.ProductImage.slice(1, 3).map((image, index) => (
                                        <Image key={index} src={image.url} alt="Product" width={150} height={150} className="rounded-[6px] hover:scale-110 duration-300" />
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    {/* <Image src="/dummy-image.jpg" alt="Discount" width={500} height={300} className="rounded-[6px]" /> */}
                    <p></p>
                </div>
                <div className="">
                    <DetailProductRightBar />
                </div>
            </div>
            <div className=" my-10">
                <RecomendedItemsBottom />
            </div>
        </div>
    )
}