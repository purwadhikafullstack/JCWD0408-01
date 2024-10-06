import { ICreateProductBySuperAdmin } from '@/components/inputformik';
import axios from 'axios';
import { use } from 'chai';
import { set } from 'cypress/types/lodash';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RiGalleryUploadFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import ImagePreview from './imagePreview';
import ImagePreviewRoom from './imagePreview';
import ImagePreviewProduct from './imagePreview';

export default function CreateProduct() {

    const initialValues: ICreateProductBySuperAdmin = {
        name: "",
        description: "",
        price: "",
        category_id: "",
        qty: ""
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required("name is required"),
        description: yup.string().required("description is required"),
        price: yup.number().required("price is required"),
        category_id: yup.string().required("category id is required"),
        qty: yup.number().required("qty is required")
    })

    const params = useParams();
    const store_id = params.id

    const createProduct = async (data: ICreateProductBySuperAdmin, action: FormikHelpers<ICreateProductBySuperAdmin>) => {
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
            const res = await fetch(`http://localhost:8000/api/product/create/${store_id}`, {
                method: 'POST',
                body: formData
            })
            const { status ,msg  } = await res.json()
            if (status == "error") throw msg
            console.log(status)
            toast.success(msg)
            action.resetForm()
        } catch (error) {
            toast.error(error as string)
        }
    }

    const [data, setData] = useState<ICategory>()
    const [image, setImage] = useState<File[]>([])

    interface ICategory {
        status: string,
        allCategories: [
            {
                category_id: number,
                category_name: string
            }
        ]
    }

    const mediaRef = useRef<HTMLInputElement | null>(null);

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

    const getCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/category/all`, {
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

    console.log(image)
    return (
        <motion.div className='flex flex-col gap-5 '
            initial={{ opacity: 0.5, translateY: -5 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.25 } }}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(value, action) => {
                    createProduct(value, action)
                    action.resetForm()
                    console.log(value)
                }}
            >
                {({ setFieldValue, values }) => {
                    return (
                        <div>
                            <Form className='flex flex-col  items-center justify-around  p-2 gap-2 rounded-[6px] bg-secondary'>
                                <p className='text-left w-full p-2 text-[18px] font-bold'>Product Form</p>
                                <div className='flex flex-wrap gap-4 w-full'>
                                    <div>
                                        <Field
                                            name='name'
                                            type='text'
                                            placeholder='name'
                                            className='p-4 rounded' />
                                        <ErrorMessage
                                            name='name'
                                            component='div' className='text-[12px] absolute' />
                                    </div>
                                    <div>
                                        <Field
                                            name='price'
                                            type='number'
                                            placeholder='price'
                                            className="p-4 rounded" />
                                        <ErrorMessage
                                            name='price'
                                            component='div' className='text-[12px] absolute' />
                                    </div>
                                    <div className=" rounded-md flex">
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
                                        <ErrorMessage
                                            name="image"
                                            component={'div'}
                                            className="text-xs text-red-700  text-[12px] absolute"
                                        />
                                    </div>
                                    <div className='flex flex-row items-center gap-2 text-[12px]'>
                                        Category
                                        <Field
                                            as='select'
                                            name='category_id'
                                            className='p-4 rounded'
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
                                        <ErrorMessage
                                            name='category_id'
                                            component='div' className='absolute text-[12px] mt-20' />
                                    </div>
                                    <div>
                                        <Field
                                            name='qty'
                                            type='number'
                                            placeholder='qty'
                                            className="p-4 rounded" />
                                        <ErrorMessage
                                            name='qty'
                                            component='div' className='text-[12px] absolute' />
                                    </div>
                                </div>
                                <div className='w-full mt-5'>
                                    <Field
                                        name='description'
                                        as='textarea'
                                        placeholder='description'
                                        className="p-4 rounded w-full" />
                                    <ErrorMessage
                                        name='description'
                                        component='div'  className='text-[12px] absolute' />
                                </div>
                                <button type='submit' className='p-4 bg-main w-44 text-secondary rounded-[6px] hover:bg-secondary hover:text-main mb-4'>Submit</button>
                            </Form>
                        </div>
                    )
                }}
            </Formik>
        </motion.div>
    )
}