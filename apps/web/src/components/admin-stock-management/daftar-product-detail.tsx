import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { ICreateProductBySuperAdmin } from "../inputformik";
import * as yup from "yup";
import { useParams } from "next/navigation";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { MdOutlineTransitEnterexit } from "react-icons/md";
import { RiGalleryUploadFill } from "react-icons/ri";
import ImagePreviewProduct from "@/app/(home)/(sidebar_superadmin)/admin-stock-management/admin-dashboard-by-super/_components/imagePreview";
import axios from "axios";

export default function DaftarProductDetail({ nama, created_at, stocktotal_inventory, harga_product, product_id }: { nama: string, created_at: string, stocktotal_inventory: number, harga_product: number, product_id: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const initialValues: ICreateProductBySuperAdmin = {
        name: nama,
        description: "",
        price: harga_product.toString(),
        category_id: "",
        qty: stocktotal_inventory.toString()
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required("name is required"),
        description: yup.string().required("description is required"),
        price: yup.number().required("price is required"),
        category_id: yup.string().required("category id is required"),
        qty: yup.number().required("qty is required")
    })
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const toggleModalUpdate = () => {
        setIsModalUpdateOpen(!isModalUpdateOpen);
    }

    console.log(product_id)
    const formatIDR = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(number);
    };

    const formattedHargaProduct = formatIDR(harga_product);
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
            const res = await fetch(`http://localhost:8000/api/product/update/${product_id}`, {
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

    const deleteProduct = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/product/delete/${product_id}`, {
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
        <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center text-[14px] items-center lg:h-10 h-60 rounded-[10px] hover:bg-secondary hover:border-secondary duration-200 border-[1px] w-full">
            <Link href={`/details-discount-management-by-super/${product_id}`} className="p-2 lg:pl-10 sm:w-[325px]">{nama} <span className="text-[10px] text-slate-400">#p.code{product_id}</span></Link>
            <p className="w-[100px]">{created_at.split("T")[0]}</p>
            <div className="flex gap-5 w-[300px]">
                <p className="w-[105px]">Qty : {stocktotal_inventory}</p>
                <p className=""> Price : {formattedHargaProduct}</p>
            </div>
            <button type="button" className="" onClick={toggleModal}>
                <IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" />
            </button>
            {isModalOpen && (
                <div className="absolute bg-white border rounded-[10px] shadow-lg  right-10 duration-300">
                    <ul className="flex flex-col items-start">
                        <button onClick={toggleModalUpdate} className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary cursor-pointer ">Update product</button>
                        {
                            isModalUpdateOpen && (
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, action) => {
                                        console.log(values)
                                        updateProduct(values, action)
                                        action.resetForm()
                                        toggleModalUpdate()
                                        toggleModal()
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
                                                    <Field name="description"as="textarea" className="border-[1px] rounded-[6px] p-2 mt-2"  placeholder="description"/>
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
                        <li className="p-2 hover:bg-main rounded-[6px] w-full duration-200 hover:text-secondary  cursor-pointer" onClick={toggleModal}>Cancel</li>
                    </ul>
                </div>
            )}
        </div>
    )
}