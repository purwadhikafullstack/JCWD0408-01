import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import { toast } from 'react-toastify';
import * as yup from 'yup';

interface InventoryUpdateData {
    product_id: number,
    qty: number,
}

const valitadationInventoryUpdateSchema = yup.object({
    qty: yup.number().required('Required')
})

export default function IsiComponentCart({ product_id, name, stock, last_stock_update }: { product_id: number, name: string, stock: number, last_stock_update: number }) {
    const router = useRouter()
    const params = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlebutton = () => {
        setIsModalOpen(!isModalOpen);
    }

    const initialValues = {
        product_id: product_id,
        qty: 0,
    }

    const updateInventory = async (data : InventoryUpdateData, action : FormikHelpers<InventoryUpdateData>) => {
        try {
            const res = await fetch(`http://localhost:8000/api/inventory/update/${product_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
            const { status, msg } = await res.json()
            if (status == "error") throw toast.error(msg)
            toast.success(msg)
            router.push(`/admin-stock-management/admin-dashboard-by-super/${params.id}`)
        } catch (error) {
            toast.error(error as string)
        }
}

return (
    <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full text-[14px]">
        <Link href={`/details-discount-management/${product_id}`} className=" hover:scale-105 duration-300">
            <motion.p className="p-1 lg:pl-6  w-[225px]"
                initial={{ opacity: 0, translateX: -10 }}
                animate={{ opacity: 1, translateX: 0 }}
            >{name}</motion.p>
        </Link>
        <div className="flex md:gap-20 gap-10 ">
            <div className="flex  items-center md:pl-10 pl-6 gap-2">STOCK : {stock} </div>
            <Formik
                initialValues={initialValues}
                validationSchema={valitadationInventoryUpdateSchema}
                onSubmit={(values, action) => {
                    action.resetForm()
                    console.log(values)
                    updateInventory(values, action)
                }}
            >
                {(props: FormikProps<InventoryUpdateData>) => {
                    return(
                        <div>
                            <Form className='flex items-center gap-2'>
                                <Field name="qty" type="number" min="0" className="p-1 rounded-[6px] w-[50px] border-[1px]" />
                                <button type='submit' className='font-bold hover:bg-main p-1 rounded-[6px] duration-300 hover:text-secondary hover:font-normal'>Add</button>
                            </Form>
                        </div>      
                    )
                }}
            </Formik>
            <div className="flex flex-wrap items-center gap-2">
                <p>LAST UPDATE :</p>
                <div>{last_stock_update}</div>
                
            </div>
        </div>
        <button onClick={handlebutton}><IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" /></button>
        {
            isModalOpen && (
                <div className="absolute  bg-white border rounded-[10px] shadow-lg  right-10 duration-300">
                    <ul className="">
                        <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary cursor-pointer ">Update product</li>
                        {/* <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer">Delete product</li> */}
                        <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer" onClick={handlebutton}>Cancel</li>
                    </ul>
                </div>
            )
        }
    </div>
)
}