import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import { MdOutlineTransitEnterexit } from "react-icons/md";
import AdminCartDetails from "./admin-cart-details";
import { UserData } from "./baskit-user";

export default function BaskitAdmin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateAdmin, setisModalUpdateAdmin] = useState(false);
    const [data, setData] = useState<UserData | null>(null);
    const [page, setPage] = useState(1);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleUpdateAdmin = () => {
        setisModalUpdateAdmin(!isModalUpdateAdmin);
    }
    
    const handleNext = () => {
        if (page === data?.totalPages) {
            return;
        }
        setPage(page + 1)
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const fetchDataUser = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}superadmin/?role=store_admin&page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });
        const dataFetch = await res.json();
        setData(dataFetch)
    }

    console.log(data)
    // console.log(data?.data[0].user_id)
    
    useEffect(() => {
        fetchDataUser()
    }, [page])

    return (
        <div className="flex flex-col justify-center items-center gap-2 ">
            {
                data?.data.map((item, key) => {
                    const totalPrice = item.Store.Order.reduce((acc, order) => acc + order.total_price, 0);
                    const convertIdr = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice);
                    return(         
                        <AdminCartDetails 
                            store_admin={item.first_name || ''} 
                            created_At={item.created_at || ''} 
                            stocktotal_inventory="stocktotal_inventory" 
                            pendapatan_bulanini={convertIdr} 
                            store={item.Store && item.Store.store_name ? item.Store.store_name : 'Unsigned'} 
                            user_id={item.user_id}
                            key={key} admin_email={item.email}
                        />
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