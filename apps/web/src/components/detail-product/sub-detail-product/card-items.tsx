import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import * as yup from 'yup';

export default function CardItems({ name, price, qty, product_id, image }: { name: string, price: number, qty: number, product_id: number, image: string }) {
    const convertPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price)

    const [cart, setCart] = useState<number>(0);
    const token = Cookies.get('token');

    const initialValues = {
        quantity: cart,
        product_id: product_id
    };

    interface IAddCartNav {
        quantity: number;
        product_id: number;
    }

    const validationSchemaAddCartNav = yup.object({
        quantity: yup
            .number()
            .required('Quantity is required')
            .min(1, 'Quantity must be at least 1')
            .max(qty, `Quantity must be at most ${qty}`)
    });

    const addToCart = (setFieldValue: (field: string, value: any) => void) => {
        if (cart < qty) {
            const newCart = cart + 1;
            setCart(newCart);
            setFieldValue('quantity', newCart);
        }
    };

    const removeFromCart = (setFieldValue: (field: string, value: any) => void) => {
        if (cart > 0) {
            const newCart = cart - 1;
            setCart(newCart);
            setFieldValue('quantity', newCart);
        }
    };


    const addToCartNav = async (initialValues : IAddCartNav) => {
        try {
            const res = await fetch('http://localhost:8000/api/cart/addnav', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(initialValues)
            })
            console.log(res)
            if (!res.ok) throw new Error("Failed to add to cart")
            setCart(0);
            toast.success("Added to cart")
            return res.json()
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }


    return (
        <div className="flex flex-col gap-2 hover:scale-105 duration-150 bg-secondary rounded-[6px] p-4 shadow">
            <Link href={`/details-product/${product_id}`} scroll={true}>
                <Image src={image} alt="Discount" width={200} height={300} className="h-48 rounded-[6px]" />
            </Link>
            <div className="border-[1px] mt-2"></div>
            <Link href={`details-product/${product_id}`}>
                <p className="font-bold">{name}</p>
                <p className="text-[10px]">#product_code{product_id}</p>
            </Link>
            <div>
                <p className="text-[14px]">{convertPrice}</p>
                <p className="text-[12px]">Qty : {qty}</p>
            </div>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaAddCartNav}
            onSubmit={(values, action) => {
                console.log(values);
                addToCartNav(values);
                action.resetForm()
            }}
        >
            {({ setFieldValue }) => (
                <Form>
                    <div className="  bg-secondary/50 rounded-[10px] border-[1px] border-main">
                        <div className="flex justify-between items-center place-content-center px-6">
                            <button
                                type="button"
                                onClick={() => removeFromCart(setFieldValue)}
                                className="w-5"
                            >
                                <AiOutlineMinus />
                            </button>
                            <Field name="quantity">
                                {() => <p className="w-4">{cart}</p>}
                            </Field>
                            <button
                                type="button"
                                onClick={() => addToCart(setFieldValue)}
                                className="w-5"
                            >
                                <AiOutlinePlus />
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="bg-main border-main border-[1px] p-2 rounded-[6px] w-full text-secondary hover:text-secondary active:scale-95 duration-200"
                        >
                            Add to cart
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
    )
}