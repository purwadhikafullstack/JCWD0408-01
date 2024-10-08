import { Form, Formik, Field } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { toast } from "react-toastify";
import * as yup from 'yup';

export const AddToCartNav = ({ item, product_id }: { item: number, product_id: number }) => {
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
            .max(item, `Quantity must be at most ${item}`)
    });

    const addToCart = (setFieldValue: (field: string, value: any) => void) => {
        if (cart < item) {
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}cart/addnav`, {
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
                    <div className="mx-5 mb-5 bg-secondary/50 rounded-[10px] border-[1px] border-main">
                        <div className="flex justify-center items-center place-content-center gap-2">
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
                            className="bg-main/80 backdrop-blur p-2 rounded-[6px] w-full text-secondary hover:text-secondary active:scale-95 duration-200"
                        >
                            Add to cart
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
