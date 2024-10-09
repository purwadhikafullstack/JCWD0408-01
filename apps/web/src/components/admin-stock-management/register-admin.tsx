import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdOutlineTransitEnterexit } from 'react-icons/md';
import * as yup from 'yup';
import { ICreateAccBySuperAdmin } from '../inputformik';
import {
    ErrorMessage,
    Field,
    Form,
    Formik,
    FormikHelpers,
    FormikProps,
} from 'formik';
import { toast } from 'react-toastify';

const createAccountbySuperAdmin = yup.object().shape({
    email: yup
        .string()
        .email('please use the correct email format')
        .required('email is required'),
    password: yup.string().min(8).required('password is required'),
    first_name: yup.string().required('first name is required'),
    phone: yup
        .string()
        .matches(/^[0-9]+$/, 'phone number must be only digits')
        .required('phone number is required'),
});


export default function RegisterForm({
    toggleModal,
}: {
    toggleModal: () => void;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const initialValues: ICreateAccBySuperAdmin = {
        email: '',
        password: '',
        first_name: '',
        phone: '',
    };

    const createStoreAdmin = async (
        data: ICreateAccBySuperAdmin,
        action: FormikHelpers<ICreateAccBySuperAdmin>,
    ) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}admin/create`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
            });
            const { status , msg } = await res.json();
            if (status == "error") throw toast.error(msg);
            toast.success(status);
            action.resetForm();
        } catch (error) {
            toast.error(error as string);
        }
    };


    return (
        <motion.div
            className=" flex flex-col bg-secondary rounded-[6px] p-10 gap-5  w-[525px]"
            initial={{ opacity: 0.5, translateY: -5 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.25 } }}
        >
            <div className="flex justify-between">
                <p className="text-[24px] font-bold">Register Form</p>
                <motion.button onClick={toggleModal}>
                    <MdOutlineTransitEnterexit
                        size={32}
                        className="text-main hover:text-secondary duration-300"
                    />
                </motion.button>
            </div>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={createAccountbySuperAdmin}
                    onSubmit={(values, action) => {
                        action.resetForm();
                        console.log(values);
                        createStoreAdmin(values, action);
                        toggleModal();
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
                                                className="p-2 rounded-[6px] w-full"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="text-red-500 text-sm text-[11px] "
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            PASSWORD
                                            <div className="relative">
                                                <Field
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    className="p-2 rounded-[6px] w-full"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                                >
                                                    {showPassword ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-500 text-sm text-[11px] "
                                            />
                                        </div>
                                        <div className="flex gap-4 ">
                                            <div className="flex flex-col gap-2 w-full">
                                                BRANCH NAME
                                                <Field
                                                    type="text"
                                                    name="first_name"
                                                    className="p-2 rounded-[6px] w-full"
                                                />
                                                <ErrorMessage
                                                    name="first_name"
                                                    component="div"
                                                    className="text-red-500 text-sm text-[11px]"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            PHONE
                                            <Field
                                                type="text"
                                                name="phone"
                                                placeholder="08XXXXXXXXXX"
                                                className="p-2 rounded-[6px] w-full"
                                            />
                                            <ErrorMessage
                                                name="phone"
                                                component="div"
                                                className="text-red-500 text-sm text-[11px]"
                                            />
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
                        );
                    }}
                </Formik>
            </div>
        </motion.div>
    );
}
