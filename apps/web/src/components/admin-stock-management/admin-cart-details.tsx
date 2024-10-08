import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { MdOutlineTransitEnterexit } from "react-icons/md";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ICreateAccBySuperAdmin } from "../inputformik";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";

const updateAccountbySuperAdmin = yup.object().shape({
    email: yup.string().email("please use the correct email format").required("email is required"),
    password: yup.string().when('$isUpdate', (isUpdate, schema) => {
        return isUpdate ? schema.min(8, 'Password harus setidaknya 8 karakter') : schema.notRequired();
    }),
    first_name: yup.string().required("first name is required"),
    phone: yup.string().matches(/^[0-9]+$/, "phone number must be only digits").required("phone number is required")
})

interface IUpdateAccBySuperAdmin {
    email: string;
    first_name: string;
    password?: string;
    phone: string;
}

export default function AdminCartDetails({ store_admin, created_At, store, user_id, stocktotal_inventory, pendapatan_bulanini, admin_email }: { store_admin: string, created_At: string, stocktotal_inventory: string, pendapatan_bulanini: string, store: string, user_id: number, admin_email: string }) {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateAdmin, setIsModalUpdateAdmin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const initialValues: IUpdateAccBySuperAdmin = {
        email: admin_email,
        first_name: store_admin,
        password: "",
        phone: "",
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setIsModalUpdateAdmin(false);
    }

    const handleUpdateAdmin = () => {
        setIsModalUpdateAdmin(!isModalUpdateAdmin);
    }

    const handleDeleteAdmin = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}admin/${user_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
            });
            const data = await res.json();
            console.log(data);
            toast.success(data.msg);
            router.push('/admin-stock-management')
            setIsModalUpdateAdmin(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    const updateAdmin = async (data: IUpdateAccBySuperAdmin, action: FormikHelpers<IUpdateAccBySuperAdmin>) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}admin/update/${user_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: `PATCH`,
                body: JSON.stringify(data)
            })
            const { status, msg } = await res.json()
            if (status == "error") throw toast.error(msg)
            toast.success(msg)
            action.resetForm()
        } catch (error) {
            console.log(error)
            toast.error(error as string)
        }
    }

    return (
        <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center text-[14px] items-center lg:h-10 h-60 rounded-[10px] hover:bg-secondary duration-200 hover:border-secondary border-[1px] w-full text-center">
            <p className="p-2 lg:pl-10 w-[100px]">{store_admin}</p>
            <p className="w-[100px]">{created_At.split('T')[0]}</p>
            <p className="w-[250px]">Store : {store}</p>
            <div className="flex gap-2">
                <p className="w-[150px]">{pendapatan_bulanini}</p>
            </div>
            <button type="button" className="" onClick={toggleModal}>
                <IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" />
            </button>
            {isModalOpen && (
                <div className="absolute bg-white border rounded-[10px] shadow-lg right-10 duration-300">
                    <ul>
                        <li className="p-2 hover:bg-main rounded-[6px] duration-200 hover:text-secondary cursor-pointer" onClick={handleUpdateAdmin}>Update Admin</li>
                        {isModalUpdateAdmin && (
                            <Formik
                                initialValues={initialValues}
                                validationSchema={updateAccountbySuperAdmin}
                                onSubmit={(values, action) => {
                                    updateAdmin(values, action)
                                    action.resetForm()
                                    console.log(values)
                                }}>
                                {(props: FormikProps<IUpdateAccBySuperAdmin>) => {
                                    return (
                                        <Form>
                                            <div className="flex flex-col absolute bg-white border rounded-[10px] shadow-lg -left-64 -top-20 duration-300 p-5">
                                                <div className="flex items-center justify-between">
                                                    <div>UPDATE ADMIN</div>
                                                    <button onClick={toggleModal}>
                                                        <MdOutlineTransitEnterexit size={32} className="text-main hover:text-secondary duration-300" />
                                                    </button>
                                                </div>
                                                <Field name="email" type="email" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                                <Field name="first_name" type="text" className="border-[1px] rounded-[6px] p-2 mt-2" />
                                                <Field name="phone" type="text" className="border-[1px] rounded-[6px] p-2 mt-2" placeholder="phone number" />
                                                <div className="relative">
                                                    <Field name="password" type={showPassword ? "text" : "password"} className="border-[1px] rounded-[6px] p-2 mt-2 w-full" placeholder="password" autoComplete="current-password" />
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-5 text-[10px]">
                                                        {showPassword ? "Hide" : "Show"}
                                                    </button>
                                                </div>
                                                <button type="submit" className="p-2 hover:bg-main rounded-[6px] duration-200 hover:text-secondary cursor-pointer mt-2">Update Admin</button>
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        )}
                        <li>
                            <button onClick={handleDeleteAdmin} className="p-2 hover:bg-main rounded-[6px] duration-200 hover:text-secondary cursor-pointer">Delete Admin</button>
                        </li>
                        <li className="p-2 hover:bg-main rounded-[6px] duration-200 hover:text-secondary cursor-pointer" onClick={toggleModal}>Cancel</li>
                    </ul>
                </div>
            )
            }
        </div >
    );
}
