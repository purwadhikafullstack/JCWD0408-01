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

export default function RegisterCategory({ toggleModalCategory }: { toggleModalCategory: () => void }) {
    const router = useRouter()

    const initialValues: ICreateCategoryBySuperAdmin = {
        category_name: "",
        description: ""
    }

    const createCategory = async (data: ICreateCategoryBySuperAdmin, action: FormikHelpers<ICreateCategoryBySuperAdmin>) => {
        try {
            const res = await fetch('http://localhost:8000/api/category/create', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data),

            })
            const { result , ok }= await res.json()
            if (!ok) throw result.msg
            console.log(result)
            console.log(ok)
            toast.success(result.msg)
            revalidateTag('reload')
            action.resetForm()
            router.refresh()
        } catch (error) {
            toast.error(error as string)
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
                {(props: FormikProps<ICreateCategoryBySuperAdmin>) => {
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
