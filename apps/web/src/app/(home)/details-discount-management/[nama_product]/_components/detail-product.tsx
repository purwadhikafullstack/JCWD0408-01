import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface ProductDetails {
    product: DataProduct,
    status: string
}

export interface DataProduct {
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

export interface Category {
    category_name: string
}

export default function DetailProductAdmin() {
    const params = useParams()
    const [data, setData] = useState<ProductDetails | null>()
    const convertParams = (params.nama_product).toString().split("%")[0]

    console.log((params.nama_product).toString().split("%")[0])

    const fetchDetailProduct = async () => {
        const res = await fetch(`http://localhost:8000/api/product/details/${convertParams}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
        const fetchData = await res.json();
        setData(fetchData)
        console.log(fetchData)
    }
    console.log(data)
    // console.log(data)
    console.log(params.nama_product)

    useEffect(() => {
        fetchDetailProduct()
    }, [])

    const priceMap = data?.product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

    console.log(data)

    return (
        <div className="flex justify-start gap-10  ">
            <div className="flex flex-col justify-evenly">
                <div>
                    <h1>{data?.product?.name!}</h1>
                    <p className="text-[14px] text-justify text-balance lg:w-[650px] font-normal text-gray-500 ">#product_code{data?.product.product_id}</p>
                    <p className="text-[14px] text-justify text-balance lg:w-[650px] font-normal text-gray-500 ">{data?.product.category.category_name}</p>
                </div>
                <p className="text-[16px] lg:w-[650px] font-normal mt-2">{data?.product.description}</p>
                <div className="flex text-[16px] gap-5 mt-4 ">
                    <p className="bg-main text-secondary p-2 rounded-[6px]">Price : Rp. {priceMap}</p>
                    <p className="bg-main text-secondary p-2 rounded-[6px]">Stock : {data?.product.Inventory[0]?.total_qty == undefined ? 0 : data?.product.Inventory[0]?.total_qty}</p>
                </div>
            </div>
            <p className="flex items-center">
                {
                    data?.product.ProductImage.map((item, key) => (
                        <div key={key} className="">
                            <Image key={key} src={item.url || '/dummy-image.jpg'} alt="Product Image" width={230} height={300} className="rounded-[10px]" />
                        </div>
                    ))
                }
            </p>
        </div>
    )
}