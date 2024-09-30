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
            const res = await fetch(`http://localhost:8000/api/discount/${convertParams}?page=${page}`, {
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
    }, [])

    const handleNext = () => {
        if (page === data?.totalPage) {
            return;
        }
        setPage(page + 1)
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
            {
                data?.data.map((item: Data, key: any) => {
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