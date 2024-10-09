'use client'

import { IoIosMore } from "react-icons/io";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { MdOutlineTransitEnterexit } from "react-icons/md";
import { RiGalleryUploadFill } from "react-icons/ri";
import ImagePreviewCategory from "./image-preview-category";

interface UpdateCategory {
    category_name: string;
    description: string;
    category_url?: File | null;
}

export default function CategoryProductDetail({ nama, registered_product, category_id, category_url }: { nama: string, registered_product: number, category_id: number, category_url: string | File }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateCategory, setIsModalUpdateCategory] = useState(false);

    const initialValues: UpdateCategory = {
        category_name: nama,
        description: "",
        category_url: typeof category_url === 'string' ? undefined : category_url,
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleUpdateCategory = () => {
        setIsModalUpdateCategory(!isModalUpdateCategory);
    }

    const fetchDeleteCategory = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}category/${category_id}`, {
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
            console.error('Error deleting category:', error);
        }
    }

    const updateCategory = async (data: UpdateCategory, action: FormikHelpers<UpdateCategory>) => {
        const formData = new FormData()
        formData.append('category_url', data.category_url as File || null)
        formData.append('category_name', data.category_name)
        formData.append('description', data.description)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}category/update/${category_id}`, {
                method: `PATCH`,
                body: formData
            })
            const { status, msg } = await res.json()
            if (status == "error") throw toast.error(msg)
            toast.success(msg)
            action.resetForm()
            setIsModalUpdateCategory(false)
            setIsModalOpen(false)
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error(error as string)
        }
    }

    const mediaRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: any, setFieldValue: any) => {
        const file = event.target.files[0]
        if (file) {
            if (file.size > 1000000) { 
                toast.error('File size should not exceed 1 MB');
                return;
            }
            setFieldValue('category_url', file)
        }
    }


    return (
        <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center text-[14px] items-center lg:h-10 h-60 rounded-[10px] hover:bg-secondary hover:border-secondary duration-200 border-[1px] w-full">
            <p className="p-2 lg:pl-10 sm:w-[250px] ">{nama}</p>
            <p className="sm:w-[200px]">Used on <span className="font-bold">{registered_product}</span> product</p>
            <button type="button" className="" onClick={toggleModal}>
                <IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" />
            </button>
            {isModalOpen && (
                <div className="absolute bg-white border rounded-[10px] shadow-lg  w-[150px] right-10 duration-300">
                    <ul className="">
                        <button onClick={handleUpdateCategory} className="p-2 hover:bg-secondary rounded-[6px] duration-200 hover:text-main cursor-pointer w-full text-start">Update Category</button>
                        {
                            isModalUpdateCategory && (
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={(values, action) => {
                                        updateCategory(values, action)
                                        action.resetForm()
                                        console.log(values)
                                    }}>
                                    {({ setFieldValue, values }) => {
                                        return (
                                            <Form>
                                                <div className="flex flex-col absolute bg-white border rounded-[10px] shadow-lg -left-64 -top-20 duration-300 p-5">
                                                    <div className="flex items-center justify-between">
                                                        <div>UPDATE CATEGORY</div>
                                                        <button onClick={toggleModal}>
                                                            <MdOutlineTransitEnterexit size={32} className="text-main hover:text-secondary duration-300" />
                                                        </button>
                                                    </div>
                                                    <Field name="category_name" type="text" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                                    <Field name="description" as="textarea" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                                    <div className="w-full mt-2 border-[1px] rounded p-2">
                                                        <label htmlFor="upload" className="text-center">
                                                            <div className="flex justify-center">
                                                                <RiGalleryUploadFill size={40} className="text-third cursor-pointer hover:text-white" />
                                                            </div>
                                                            <p className="text-main">Category Poster</p>
                                                        </label>
                                                        <ImagePreviewCategory category_url={values.category_url} setFieldValue={setFieldValue} mediaRef={mediaRef} />
                                                        <input
                                                            onChange={(e: any) => handleFileChange(e, setFieldValue)}
                                                            type="file"
                                                            id="upload"
                                                            name="category_url"
                                                            className="hidden"
                                                        />
                                                        <ErrorMessage
                                                            name="category_url"
                                                            component={'div'}
                                                            className="text-xs text-red-700"
                                                        />
                                                    </div>
                                                    <button type="submit" className="p-2 hover:bg-main rounded-[6px] duration-200 hover:text-secondary cursor-pointer mt-2">Update</button>
                                                </div>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            )
                        }
                        {registered_product === 0 && (
                            <button onClick={fetchDeleteCategory} className="p-2 w-full text-start hover:bg-secondary rounded-[6px] duration-200 hover:text-main cursor-pointer">Delete Category</button>
                        )}
                        <li className="p-2 w-full hover:bg-secondary rounded-[6px]  duration-200 hover:text-main  cursor-pointer" onClick={toggleModal}>Cancel</li>
                    </ul>
                </div>
            )}
        </div>
    )
}