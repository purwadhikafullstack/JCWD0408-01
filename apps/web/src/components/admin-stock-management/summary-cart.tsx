import axios from "axios";
import { get } from "cypress/types/lodash";
import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { toast } from "react-toastify";

interface ITransaction {
    status: string;
    msg: string;
    order: [
        {
            OrderItem: [
                {
                    product: {
                        category_id: number;
                        name: string;
                        product_id: number;
                    }
                }
            ]
            total_price: number;
            user_id: number;
            user: {
                first_name: string;
                last_name: string;
            }
        }
    ]
    currentPage: number;
    totalRavenue: number;
    totalItem: number;
    totalPage: number;
}


export default function SummaryCart() {
    const [page, setPage] = useState(1);
    const [productId, setProductId] = useState<Number | null>(null);
    const [categoryId, setCategoryId] = useState<Number | null>(null);
    const [data, setData] = useState<ITransaction>();
    const [category, setCategory] = useState<any>(null);
    const [product, setProduct] = useState<any>(null);

    const fetchDataTransation = async (categoryId: Number | null = null, productId: Number | null = null) => {
        // Base URL
        let url = `http://localhost:8000/api/transaction?page=${page}`;

        // Build query parameters dynamically
        if (categoryId) {
            url += `&category_id=${categoryId}`;
        }

        if (productId) {
            url += `&product_id=${productId}`;
        }

        try {
            const res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });

            const fetchData = await res.json();
            setData(fetchData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchDataTransation();;
    }, [page])

    const handleSubmitFilter = () => {
        if (productId && categoryId) {
            fetchDataTransation(categoryId, productId)
        }
        else if (productId) {
            fetchDataTransation(null, productId)
        } else if (categoryId) {
            fetchDataTransation(categoryId, null)
        }
    }

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

    console.log(data)

    const convertPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
    }

    const getCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/category/all`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })
            setCategory(res.data)
        } catch (error) {
            toast.error(error as string)
        }
    }
    const getProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/product/products/all`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })
            setProduct(res.data)
        } catch (error) {
            toast.error(error as string)
        }
    }

    console.log(category)

    useEffect(() => {
        getCategory()
        getProduct()
    }, [])

    return (
        <div className="w-full ">
            <div className="flex flex-wrap justify-center items-center gap-5 mt-10">
                <div>
                    <select onChange={(e) => setCategoryId(Number(e.target.value))} className="w-40 h-6 rounded-[10px] border-[1px] text-[16px] border-main">
                        <option value="">Select Category</option>
                        {
                            category?.allCategories.map((item: any, key: number) => {
                                return (
                                    <option key={key} value={item.category_id}>{item.category_name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <select onChange={(e) => setProductId(Number(e.target.value))} className="w-40 h-6 rounded-[10px] border-[1px] text-[16px] border-main">
                        <option value="">Select Product</option>
                        {
                            product?.product.map((item: any, key: number) => {
                                return (
                                    <option key={key} value={item.product_id}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="flex items-center">
                    <button onClick={handleSubmitFilter} className="w-20 h-6 text-center text-[16px] bg-main text-white rounded-[10px]">Filter</button>
                </div>
            </div>
            <div className="px-5">
                {
                    data?.order && data.order.length > 0 ?
                        data?.order.map((item, key: number) => {
                            return (
                                <div key={key} className="flex lg:flex-row gap lg:justify-start justify-start text-[14px] items-start lg:h-10 h-32 rounded-[10px] hover:bg-secondary duration-200 hover:border-secondary border-[1px] w-full text-center my-5">
                                    <div className="flex flex-col lg:flex-row justify-between items-center w-full">
                                        <div className="flex flex-col flex-wrap lg:flex-row sm:justify-between justify-center items-center w-full">
                                            {/* <p className="lg:w-1/3 w-full">{item.OrderItem}</p> */}
                                            <div className="flex flex-wrap justify-center items-center w-[150px]">
                                                <p className="p-2">{item.user.first_name ? item.user.first_name : "No Firstname"}</p>
                                                <p className="p-2 text-[10px] text-main">#{item.user_id ? item.user.first_name : "No Item Id"}</p>
                                            </div>
                                            <div className="flex flex-wrap justify-center gap-2 items-center w-[250px]">
                                                <p>{item.OrderItem.length > 0 ? item.OrderItem[0].product.name : "No Order Item"}</p>
                                                <p>{item.OrderItem.length > 0 ? item.OrderItem[0].product.category_id : "No Category"}</p>
                                            </div>
                                            <p className="p-2">{convertPrice(item.total_price)}</p>
                                        </div >
                                    </div>
                                </div>
                            )
                        })
                        :
                        <p className="text-center mt-5">No Data Found</p>
                }
            </div>
            <div className="flex w-24 justify-center items-center rounded-[24px] gap-5 h-10 my-5 mx-auto">
                <button onClick={handlePrev}><GrFormPrevious size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
                <button onClick={handleNext}><GrFormNext size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full" /></button>
            </div>
            <div>
            </div>
        </div>
    )
}