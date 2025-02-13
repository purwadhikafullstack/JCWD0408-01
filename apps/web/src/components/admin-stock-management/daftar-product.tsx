import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import DaftarProductDetail from "./daftar-product-detail";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ProductData {
    status: string,
    product: [
        {
            product_id: number,
            product_name: string,
            created_at: string,
            stocktotal_inventory: number,
            harga_product: number,
            updated_at: string,
        }
    ],
    totalPages: number,
    currentPage: number
}

export default function DaftarProduct() {
    const [data, setData] = useState<ProductData | null>(null);
    const [page, setPage] = useState(1);
    const params = useParams()

    const fetchDataProduct = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}superadmin/product?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });
        const data = await res.json();
        console.log(data)
        setData(data)
    }

    useEffect(() => {
        fetchDataProduct()
    }, [page])

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const handleNext = () => {
        if (page === data?.totalPages) {
            return
        }
        setPage(page + 1)
    }

    return (
        <div className="flex flex-col justify-center items-center gap-2 ">
            {
                data?.product.map((item: any, key: any) => {
                    return (
                        <div className="w-full" key={key}>
                            <DaftarProductDetail nama={item.name} created_at={item.created_at} harga_product={item.price} stocktotal_inventory={item.Inventory[0].total_qty} product_id={item.product_id} key={key} />
                        </div>
                    )
                })
            }
            <div className="flex w-24 justify-center items-center rounded-[24px] gap-5 h-10 mt-5 ">
                <button onClick={handlePrev}><GrFormPrevious size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
                <button onClick={handleNext}><GrFormNext size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
            </div>
        </div>
    );
}