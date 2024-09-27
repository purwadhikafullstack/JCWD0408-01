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

export default function CreateProduct() {

    const initialValues: ICreateProductBySuperAdmin = {

        name: "",
        description: "",
        price: "",
        image: null,
        category_id: ""
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required("name is required"),
        description: yup.string().required("description is required"),
        price: yup.number().required("price is required"),
        category_id: yup.string().required("category id is required")
    })

    const params = useParams();
    const store_id = params.id

    const createProduct = async (data: ICreateProductBySuperAdmin, action: FormikHelpers<ICreateProductBySuperAdmin>) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)
        if (data.image) {
            formData.append('image', data.image);
        }
        formData.append('category_id', data.category_id)

        try {
            const res = await fetch(`http://localhost:8000/api/product/create/${store_id}`, {
                method: 'POST',
                body: formData
            })
            const { result, ok } = await res.json()
            if (!ok) throw result.msg
            console.log(result)
            console.log(ok)
            toast.success(result.msg)
            action.resetForm()
        } catch (error) {
            toast.error(error as string)
        }
    }

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

    const mediaRef = useRef<HTMLInputElement | null>(null);
    const handleFileChange = (event: any, setFieldValue: any) => {
        const file = event.target.files[0]
        if (file) {
            setFieldValue('image', file)
        }
    }

    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/category`, {
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
        getCategory()
    }, [])

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
                                <p className='text-left w-full p-2 text-[16px]'>Product Form</p>
                                <div className='flex gap-2 w-full'>
                                    <div>
                                        <Field
                                            name='name'
                                            type='text'
                                            placeholder='name'
                                            className='p-4 rounded' />
                                        <ErrorMessage
                                            name='name'
                                            component='div' />
                                    </div>
                                    <div>
                                        <Field
                                            name='price'
                                            type='number'
                                            placeholder='price'
                                            className="p-4 rounded" />
                                        <ErrorMessage
                                            name='price'
                                            component='div' />
                                    </div>
                                    <div className=" rounded-md">
                                        <label htmlFor="upload" className="text-center">
                                            <div className="flex justify-center">
                                                <RiGalleryUploadFill size={56} className="text-third cursor-pointer hover:text-white" />
                                            </div>
                                        </label>
                                        <ImagePreview image={values.image} setFieldValue={setFieldValue} mediaRef={mediaRef} />
                                        <input
                                            onChange={(e: any) => handleFileChange(e, setFieldValue)}
                                            type="file"
                                            id="upload"
                                            name="image"
                                            className="hidden"
                                        />
                                        <ErrorMessage
                                            name="image"
                                            component={'div'}
                                            className="text-xs text-red-700"
                                        />
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        Category
                                        <Field
                                            as='select'
                                            name='category_id'
                                            className='p-4 rounded'
                                        >
                                            {
                                                data?.allCategories.map(({ category_id, category_name }: { category_id: number, category_name: string }) => {
                                                    return (
                                                        <option key={category_id} value={category_id} className='text-justify'>{category_name}</option>
                                                    )
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage
                                            name='category_id'
                                            component='div' />
                                    </div>
                                </div>
                                <div className='w-full'>
                                    <Field
                                        name='description'
                                        as='textarea'
                                        placeholder='description'
                                        className="p-4 rounded w-full" />
                                    <ErrorMessage
                                        name='description'
                                        component='div' />
                                </div>
                                <button type='submit' className='p-4 bg-main w-44 text-secondary rounded-[6px] hover:bg-secondary hover:text-main'>Submit</button>
                            </Form>
                        </div>
                    )
                }}
            </Formik>
        </motion.div>
    )
}