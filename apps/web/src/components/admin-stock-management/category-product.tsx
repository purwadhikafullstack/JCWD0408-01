import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import CategoryProductDetail from "./category-product-detail";
import { use } from "chai";
import { revalidateTag } from "next/cache";

export interface CategoryData{
    status: string,
    allCategories: [
        {
            category_id: number,
            category_name: string,
            created_at: string,
            description: string,
            updated_at: string,
        }
    ]
    totalPages: number,
    currentPage: number
}

export default function CategoryProduct() {

    const [data, setData] = useState<CategoryData | null>(null);
    const [page, setPage] = useState(1);

    const fetchDataCategory = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}category?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                
            },
            next: { tags : ["reload"]},
        });
        const data = await res.json();
        console.log(data)
        setData(data)
    }

    useEffect(() => {
        fetchDataCategory()
    }, [page, "reload"])

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
                data?.allCategories.map((item: any, key: any) => {
                    return (
                        <CategoryProductDetail nama={item.category_name} registered_product={item.Product.length} category_id={item.category_id} category_url={item.category_url} key={key}/>
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