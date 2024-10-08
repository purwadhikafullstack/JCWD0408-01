import { ICreateProductBySuperAdmin } from '@/components/inputformik';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';
import { MdOutlineTransitEnterexit } from 'react-icons/md';
import { RiGalleryUploadFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import ImagePreviewProduct from './imagePreview';
import axios from 'axios';

interface InventoryUpdateData {
    product_id: number,
    qty: number,
}

const valitadationInventoryUpdateSchema = yup.object({
    qty: yup.number().required('Required')
})

export default function IsiComponentCart({ product_id, name, stock, last_stock_update, price }: { product_id: number, name: string, stock: number, last_stock_update: number, price: number }) {
    const router = useRouter()
    const params = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const initialValues2: ICreateProductBySuperAdmin = {
        name: name,
        description: "",
        price: price.toString(),
        category_id: "",
        qty: stock.toString()
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required("name is required"),
        description: yup.string().required("description is required"),
        price: yup.number().required("price is required"),
        category_id: yup.string().required("category id is required"),
        qty: yup.number().required("qty is required")
    })

    const toggleModalUpdate = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    }

    const handlebutton = () => {
        setIsModalOpen(!isModalOpen);
    }

    const initialValues = {
        product_id: product_id,
        qty: 0,
    }

    const updateInventory = async (data: InventoryUpdateData, action: FormikHelpers<InventoryUpdateData>) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}inventory/update/${product_id}`, {
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

    const [image, setImage] = useState<File[]>([])

    const updateProduct = async (data: ICreateProductBySuperAdmin, action: FormikHelpers<ICreateProductBySuperAdmin>) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('category_id', data.category_id)
        formData.append('qty', data.qty)
        image.forEach((file) => {
            formData.append('product', file)
        })

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}product/update/${product_id}`, {
                method: 'PATCH',
                body: formData
            })
            const { status, msg } = await res.json()
            if (status == "error") throw msg
            console.log(status)
            toast.success(msg)
            action.resetForm()
        } catch (error) {
            toast.error(error as string)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFile = Array.from(e.target.files);
            const maxFileSize = 1 * 1024 * 1024;
            const filterSize = newFile.filter((file) => {
                if (file.size > maxFileSize) {
                    toast.error("Maximum file must be 1MB");
                    return false;
                }
                return true;
            });
            const total = image.length + filterSize.length;
            if (total > 3) {
                toast.error("Maximum file must be 3");
                return;
            }
            setImage((prevFiles) => [...prevFiles, ...filterSize]);
        }
    };
    console.log(image)

    const [data, setData] = useState<ICategory>()

    interface ICategory {
        status: string,
        allCategories: [
            {
                category_id: number,
                category_name: string
            }
        ]
    }

    const getCategory = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}category/all`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })
            setData(res.data)
        } catch (error) {
            toast.error(error as string)
        }
    }
    useEffect(() => {
        getCategory()
    }, [])

    const deleteProduct = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}product/delete/${product_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            });
            const data = await res.json();
            console.log(data);
            toast.success(data.msg);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    return (
        <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center items-center lg:h-10 h-60 rounded-[10px] border-[1px] w-full text-[14px]">
            <Link href={`/details-discount-management-by-super/${product_id}`} className=" hover:scale-105 duration-300">
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
                        return (
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
                    <div className="absolute bg-white border rounded-[10px] shadow-lg  right-10 duration-300">
                        <ul className="">
                            <button onClick={toggleModalUpdate} className="p-2 w-full text-left hover:bg-main rounded-[6px]  duration-200 hover:text-secondary cursor-pointer ">Update product</button>
                            {
                                isModalUpdateOpen && (
                                    <Formik
                                        initialValues={initialValues2}
                                        validationSchema={validationSchema}
                                        onSubmit={(values, action) => {
                                            console.log(values)
                                            updateProduct(values, action)
                                            action.resetForm()
                                            toggleModalUpdate()

                                        }}>
                                        {({ setFieldValue, values }) => {
                                            return (
                                                <Form>
                                                    <div className="flex flex-col absolute bg-white border rounded-[10px] shadow-lg -left-64 -top-20 duration-300 p-5">
                                                        <div className="flex items-center justify-between">
                                                            <div>UPDATE PRODUCT</div>
                                                            <button onClick={toggleModalUpdate}>
                                                                <MdOutlineTransitEnterexit size={32} className="text-main hover:text-secondary duration-300" />
                                                            </button>
                                                        </div>
                                                        <Field name="name" type="text" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                                        <Field name="description" as="textarea" className="border-[1px] rounded-[6px] p-2 mt-2" placeholder="description" />
                                                        <Field name="price" type="number" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                                        <Field
                                                            as='select'
                                                            name='category_id'
                                                            className='p-2 rounded mt-2'
                                                        >
                                                            <option className='text-[10px]'>Select Category</option>
                                                            {
                                                                data?.allCategories.map(({ category_id, category_name }: { category_id: number, category_name: string }) => {
                                                                    return (
                                                                        <option key={category_id} value={category_id} className='text-justify '>{category_name}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Field>
                                                        <Field name="qty" type="number" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                                        <div className=" rounded-md flex mt-2">
                                                            <label htmlFor="upload" className="text-center">
                                                                <div className="flex justify-center">
                                                                    <RiGalleryUploadFill size={56} className="text-third cursor-pointer hover:text-white" />
                                                                </div>
                                                            </label>
                                                            <ImagePreviewProduct files={image} setSelectedFiles={setImage} />
                                                            <input
                                                                onChange={handleFileChange}
                                                                type="file"
                                                                id="upload"
                                                                multiple
                                                                max={3}
                                                                name="image"
                                                                className="hidden"
                                                            />
                                                        </div>
                                                        <button type="submit" className="p-2 hover:bg-main rounded-[6px] duration-200 hover:text-secondary cursor-pointer mt-2">Update Product</button>
                                                    </div>
                                                </Form>
                                            )
                                        }}
                                    </Formik>
                                )
                            }
                            <button onClick={deleteProduct} className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer w-full text-start">Delete product</button>
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer" onClick={handlebutton}>Cancel</li>
                        </ul>
                    </div>
                )
            }
        </div>
    )
}