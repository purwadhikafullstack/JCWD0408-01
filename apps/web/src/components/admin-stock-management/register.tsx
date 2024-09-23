import { motion } from "framer-motion";
import { useState } from "react";
import { MdOutlineTransitEnterexit } from "react-icons/md";
import * as yup from "yup";
import { ICreateAccBySuperAdmin } from "../inputformik";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";

const createAccountbySuperAdmin = yup.object().shape({
    email: yup.string().email("please use the correct email format").required("email is required"),
    password: yup.string().min(8).required("password is required"),
    first_name: yup.string().required("first name is required"),
    last_name: yup.string().required("last name is required"),
    date_ob: yup.date().required("date of birth is required"),
    phone: yup.string().matches(/^[0-9]+$/, "phone number must be only digits").required("phone number is required"),
    address: yup.string().required(),
    role: yup.string().required(),
})


export default function RegisterForm({ toggleModal }: { toggleModal: () => void }) {
    const [user, setUser] = useState<ICreateAccBySuperAdmin | null>(null)

    const initialValues: ICreateAccBySuperAdmin = {
        email: "",
        password: "",
        first_name: "",
        phone: "",
        address: "",
        role: "store_admin"

    }

    return (
        <motion.div className=" flex flex-col bg-secondary rounded-[24px] p-10 gap-5  w-[525px]"
            initial={{ opacity: 0.5, translateY: -5 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.25 } }}>

            <div className="flex justify-between">
                <p className="text-[24px] font-bold">Register Form</p>
                <motion.button onClick={toggleModal}>
                    <MdOutlineTransitEnterexit size={32} className="text-main hover:text-secondary duration-300" />
                </motion.button>
            </div>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={createAccountbySuperAdmin}
                    onSubmit={(values, action) => {
                        action.resetForm()
                        console.log(values)
                    }}
                >
                    {(props: FormikProps<ICreateAccBySuperAdmin>) => {
                        return (
                            <div className="w-full ">
                                <Form>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            EMAIL
                                            <Field
                                                type="email"
                                                name="email"
                                                className="p-2 rounded-[6px] w-full" />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-sm absolute left-24 text-[12px] mt-[2px]" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            PASSWORD
                                            <Field
                                                type="password"
                                                name="password"
                                                className="p-2 rounded-[6px] w-full" />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-500 text-sm absolute left-36 text-[12px] mt-[2px]" />
                                        </div>
                                        <div className="flex gap-4 ">
                                            <div className="flex flex-col gap-2 w-full">
                                                BRANCH NAME
                                                <Field
                                                    type="text"
                                                    name="first_name"
                                                    className="p-2 rounded-[6px] w-full" />
                                                <ErrorMessage
                                                    name="first_name"
                                                    component="div"
                                                    className="text-red-500 text-sm absolute left-44 text-[12px] mt-[2px]" />
                                            </div>
                                         
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            PHONE
                                            <Field
                                                type="text"
                                                name="phone"
                                                placeholder="08XXXXXXXXXX"
                                                className="p-2 rounded-[6px] w-full" />
                                            <ErrorMessage
                                                name="phone"
                                                component="div"
                                                className="text-red-500 text-sm absolute left-28 text-[12px] mt-[2px]" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            ADDRESS
                                            <Field
                                                as="textarea"
                                                name="address"
                                                className="p-2 rounded-[6px] w-full" />
                                            <ErrorMessage
                                                name="address"
                                                component="div"
                                                className="text-red-500 text-sm absolute left-32 text-[12px] mt-[2px]" />
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-main text-white rounded-[6px] w-full h-10  duration-300 active:scale-95 mt-5"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        )
                    }}
                </Formik>
            </div>
        </motion.div>
    )
}