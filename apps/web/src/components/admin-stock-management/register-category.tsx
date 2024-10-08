import * as yup from 'yup'
import { ICreateCategoryBySuperAdmin } from '../inputformik'
import { motion } from 'framer-motion'
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { MdOutlineTransitEnterexit } from 'react-icons/md'
import { createCategorybySuperAdmin } from '@/libs/schema'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import { tagRevalidate } from '@/libs/action/server'
import ImagePreviewCategory from './image-preview-category'
import { useRef } from 'react'
import { RiGalleryUploadFill } from 'react-icons/ri'

export default function RegisterCategory({ toggleModalCategory }: { toggleModalCategory: () => void }) {
    const router = useRouter()

    const initialValues: ICreateCategoryBySuperAdmin = {
        category_name: "",
        description: "",
        category_url: null
    }

    const createCategory = async (data: ICreateCategoryBySuperAdmin, action: FormikHelpers<ICreateCategoryBySuperAdmin>) => {
        const formData = new FormData()
        formData.append('category_url', data.category_url as File || null)
        formData.append('category_name', data.category_name)
        formData.append('description', data.description)

        try {
            const res = await fetch('http://localhost:8000/api/category/create', {
                method: 'POST',
                body: formData,
            })
            const { status, msg } = await res.json()
            if (status == 'error') throw toast.error(msg)
            toast.success(msg)
            revalidateTag('reload')
            action.resetForm()
            router.refresh()
        } catch (error) {
            toast.error(error as string)
        }
    }

    const mediaRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: any, setFieldValue: any) => {
        const file = event.target.files[0]
        if (file) {
            if (file.size > 1000000) { // 1 MB = 1048576 bytes
                toast.error('File size should not exceed 1 MB');
                return;
            }
            setFieldValue('category_url', file)
        }
    }

    return (
        <motion.div className='flex flex-col bg-secondary rounded-[6px] p-10 gap-5  w-[525px]'
            initial={{ opacity: 0.5, translateY: -5 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.25 } }}>
            <div className="flex justify-between">
                <p className="text-[24px] font-bold">Category Form</p>
                <motion.button onClick={toggleModalCategory}>
                    <MdOutlineTransitEnterexit size={32} className="text-main hover:text-secondary duration-300" />
                </motion.button>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={createCategorybySuperAdmin}
                onSubmit={(values, action) => {
                    action.resetForm()
                    console.log(values)
                    toggleModalCategory()
                    tagRevalidate('reload')
                    createCategory(values, action)
                }}
            >
                {({ setFieldValue, values }) => {
                    return (
                        <div className='w-full'>
                            <Form className='flex flex-col gap-5'>
                                <div className='flex flex-col '>
                                    <p className='mb-2'>NAME</p>
                                    <Field
                                        name="category_name"
                                        type="text"
                                        className="p-2 rounded-[6px] w-full"
                                    />
                                    <ErrorMessage
                                        name="category_name"
                                        component="div"
                                        className=" text-red-500 text-[12px] mt-1" />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='mb-2'>DESCRIPTION</p>
                                    <Field
                                        name="description"
                                        as="textarea"
                                        className="p-2 rounded-[6px] w-full" />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className=" text-red-500 text-[12px] mt-1" />
                                </div>
                                <p className="text-main">UPLOAD CATEGORY POSTER</p>
                                <div className='w-full bg-white p-2'>
                                    <label htmlFor="upload" className="text-center">
                                        <div className="flex justify-center">
                                            <RiGalleryUploadFill size={40} className="text-third cursor-pointer hover:text-white" />
                                        </div>
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
                                <button
                                    type="submit"
                                    className="bg-main text-white rounded-[6px] w-full h-10  duration-300 active:scale-95"
                                >
                                    Create
                                </button>
                            </Form>
                        </div>
                    )
                }}
            </Formik>

        </motion.div>
    )
}
