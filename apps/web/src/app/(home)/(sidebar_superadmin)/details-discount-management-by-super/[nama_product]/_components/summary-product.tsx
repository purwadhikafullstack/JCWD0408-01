import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { GrFormNext, GrFormPrevious } from "react-icons/gr";


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
    user: {
        first_name: string;
        last_name: string;
        email: string;
    }
}

interface TransactionResponse {
    status: string;
    msg: string;
    order: Order[];
    totalRavenue: number;
    totalItem: number;
    totalQty: number;
}



export default function SummaryProduct() {
    const params = useParams()
    const [page, setPage] = useState(1)
    const [transaction, setTransaction] = useState<TransactionResponse>()


    const fetchDataTransaction = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}transaction?page=${page}&product_id=${params.nama_product}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        const fetchData = await res.json()
        setTransaction(fetchData)
    }


    useEffect(() => {
        fetchDataTransaction();
    }, [page])


    const handleNext = () => {
        if (page === transaction?.totalItem) {
            return;
        }
        setPage(page + 1)
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const convertPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
    }

    console.log(transaction)


    return (
        <div className="w-full font-normal text-[16px] ">
            {
            transaction?.order?.length ? (
                <div className="flex flex-col items-center p-2">
                {
                    transaction.order.map((item: Order, key: number) => (
                    <div key={key} className="flex border-[1px] rounded-[10px] justify-between p-2 m-2 gap-5 w-full ">
                        <p>User : {item.user.first_name} <span className="text-[12px] text-gray-500">{item.user.email} </span></p>
                        <p>Total Qty: {item.OrderItem.reduce((total, orderItem) => total + orderItem.qty, 0)}</p>
                        <p>Total Price: {convertPrice(item.total_price)}</p>
                    </div>
                    ))
                }
                <div className="flex justify-center items-center rounded-[24px] gap-5 h-10 my-5">
                    <button onClick={handlePrev}><GrFormPrevious size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
                    <button onClick={handleNext}><GrFormNext size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
                </div>
                </div>
            ) : (
                <p className="p-2">No transactions available</p>
            )
            }
        </div>
    )
}