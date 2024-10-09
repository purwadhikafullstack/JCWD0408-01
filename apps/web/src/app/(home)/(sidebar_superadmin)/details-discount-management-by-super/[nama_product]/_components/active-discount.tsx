import { useEffect, useState } from "react";
import ActiveDetailsDiscount from "./detail-active-discount";
import { useParams } from "next/navigation";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface DiscountData {
    data: []
    totalPage: number
}

interface Data {
    discount_code: string;
    discount_value: number;
    minimum_order: number;
    expires_at: string;
    discount_type: string;
}

export default function ActiveDiscount() {
    const [data, setData] = useState<DiscountData | null>(null)
    const params = useParams()
    const convertParams = Number(params.nama_product.toString().split("%")[0])
    const [page, setPage] = useState(1)

    const fetchDataDiscount = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}discount/${convertParams}?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            })
            const dataFetch: DiscountData = await res.json()
            setData(dataFetch)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDataDiscount()
    }, [page])

    const handleNext = () => {
        if (page < data?.totalPage!) {
            setPage(page + 1)
        }
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    console.log(convertParams)
    console.log(data)

    return (
        <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between text-[16px] sm:px-10 mb-2">
                <p>Discount Code</p>
                <div className="flex lg:gap-40 gap-5">
                    <p>Discount Value</p>
                    <p>Minimum Order</p>
                    <p>Expired At</p>
                </div>
                <p>More</p>
            </div>
            <div className="w-full border-[1px] border-secondary mb-2"></div>
            {
                data?.data?.map((item: Data, key: any) => {
                    return (
                        <ActiveDetailsDiscount nama={item.discount_code} type={item.discount_type} value={item.discount_value} minimum_order={item.minimum_order} expires_at={item.expires_at} key={key} />
                    )
                })
            }
            <div className="w-full flex justify-center">
                <div className="flex border-[1px] w-24 justify-center items-center rounded-[24px] gap-5 h-10">
                    <button onClick={handlePrev}><GrFormPrevious size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
                    <button onClick={handleNext}><GrFormNext size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
                </div>
            </div>
        </div>
    )
}