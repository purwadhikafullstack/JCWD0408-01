
import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import UserCartDetails from "./user-cart-detail";
import { set } from "cypress/types/lodash";

export interface UserData {
    status: string,
    data: [
        {
            user_id: number,
            email: string,
            password: string,
            first_name: string,
            last_name: string,
            date_ob: string,
            avatar: string,
            role: string,
            created_at: string,
            updated_at: string,
            Store : 
                {
                    store_id: number,
                    store_name: string,
                    created_at: string,
                    updated_at: string,
                }
            
        }
    ],
    totalData: number,
    totalPages: number,
}

export default function BaskitUser() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUser, setIsModalUser] = useState(false);
    const [data, setData] = useState<UserData | null>(null);
    const [page, setPage] = useState(1);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (isModalOpen == false) {
            setIsModalUser(false);
        }
    };

    const handleUpdateUser = () => {
        setIsModalUser(!isModalUser);
        if (isModalOpen == false) {
            setIsModalUser(false);
        }
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
        const res = await fetch(`http://localhost:8000/api/superadmin/?role=buyer&page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        });
        const data = await res.json();
        setData(data)
        console.log(data.data)
    }

    useEffect(() => {
        fetchDataUser()
    }, [page])

    return (
        <div className="flex flex-col justify-center items-center gap-2 ">
            {
                data?.data.map((item, key) => {
                    return (
                        <UserCartDetails nama={item.first_name} created_at={item.created_at} email={item.email} key={item.user_id}/>
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
