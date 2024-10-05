import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import { MdOutlineInventory2 } from "react-icons/md";

interface InventoryData {
    currentPage: number
    inventory: Inventory[]
    inventoryCount: number
    status: string
    totalPage: number
}

interface Inventory {
    qty: number
    total_qty: number
    updated_at: string
}

export default function InventoryHistory() {
    const params = useParams()
    const [data, setData] = useState<InventoryData | null>(null)
    const [page, setPage] = useState(1)

    const fetchDataInventoryHistory = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/inventory/summary/${params.nama_product}?page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            })
            const dataFetch = await res.json()
            console.log(dataFetch)
            setData(dataFetch)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDataInventoryHistory()
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

    return (
        <div>
            <div className="flex gap-2 items-center mb-5">
                <MdOutlineInventory2 size={24} className="text-main" />
                <h1 className="">Inventory History</h1>
            </div>
            <div className="flex w-full justify-between text-[16px] px-10 mb-2">
                <p>Total Quantity</p>
                <p>Added Quantity</p>
                <p>Created & Updated At</p>
            </div>
            <div className="w-full border-[1px] border-secondary mb-2"></div>
            {
                data?.inventory.map((item, key) => (
                    <div key={key} className="flex gap-6">
                        <div className="flex lg:flex-row flex-wrap font-normal text-[14px] lg:justify-between justify-between items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full mb-2 ">
                            <p className="p-2 lg:pl-10 w-[125px] lg:w-[350px] font-bold text-[16px] text-center lg:text-left">{item.total_qty}</p>
                            <p className="lg:w-[250px] w-[125px] text-center"> {item.qty}</p>
                            <p className="mr-10 lg:w-[300px] w-[100px] text-right"> {item.updated_at.split("T")[0]}</p>
                        </div>
                    </div>
                ))
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
