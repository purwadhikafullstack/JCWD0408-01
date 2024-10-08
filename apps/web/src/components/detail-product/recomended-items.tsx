import { useEffect, useState } from "react";
import CardItems from "./sub-detail-product/card-items";

interface Data {
    status  : string
    randomProduct: [
        {
            Inventory : [
                {
                    qty : number
                    total_qty : number
                }
            ]
            ProductImage : [
                {
                    url : string
                }
            ]
            category : {
                category_name : string
            }
            description : string
            name : string
            price : number
            product_id : number
            store_id : number
        }
    ]
    msg : string
}



export default function RecomendedItemsBottom() {
    const [data, setData] = useState<Data>();


    const fetchData = async () => {
        const res = await fetch('http://localhost:8000/api/product/products/random', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
        })
        const fetchData = await res.json();
        setData(fetchData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log(data)

    return (
        <div className="flex flex-col justify-center items-center gap-5 px-10 ">
            <div className="border-[1px] w-full border-accent "></div>
            <h1 className="text-[28px] font-bold">You Might Need These!!</h1>
            <div className="flex flex-wrap justify-center gap-10 mx-40">
                {
                    data?.randomProduct.slice(0, 8).map((item) => {
                        return (
                            <CardItems
                                name={item.name}
                                price={item.price}
                                product_id={item.product_id}
                                qty={item.Inventory[0].qty}
                                image={item.ProductImage[0]?.url}
                                key={item.product_id}
                            />
                        );
                    })
                }
            </div>
        </div>
    )
}