
import { CreateDiscount } from "@/components/inputformik";
import { validationSchemaDiscount } from "@/libs/schema";
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function PercentageFormDiscount() {
    const params = useParams()
    console.log((params.nama_product).toString().split("%"))
    const convertParams = Number(params.nama_product.toString().split("%")[0])

    const initialValues: CreateDiscount = {
        product_id: convertParams,
        discount_code: '',
        discount_type: 'percentage',
        discount_value: 0,
        minimum_order: null,
        expires_at: ''
    }

    const createPercentageDiscount = async (data: CreateDiscount, action: FormikHelpers<CreateDiscount>) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}discount/create`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
            const { status, msg } = await res.json();
            if (status == "error") throw toast.error(msg)
            toast.success(msg)
            action.resetForm()
        } catch (error) {
            toast.error(error as string)
        }
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaDiscount}
            onSubmit={(values, action) => {
                console.log(values)
                createPercentageDiscount(values, action)
                action.resetForm()
            }}
        >
            {(props: FormikProps<CreateDiscount>) => {
                return (
                    <Form>
                        <div className="flex flex-col gap-3 text-[16px]">
                            <p className="font-medium">Percentage Discount</p>
                            <div className="border-[1px] w-full "></div>
                            <div className="flex items-center justify-between gap-5 mt-2">
                                <p>Name</p>
                                <div>
                                    <Field
                                        name="discount_code"
                                        type="text"
                                        className=" w-[150px] p-2 rounded-[6px] border-[1px]"
                                    />
                                    <ErrorMessage
                                        name="discount_code"
                                        component="div"
                                        className="  text-red-500 text-[12px] mt-1 " />
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 items-center">
                                <p>Percentage (%)</p>
                                <div>
                                    <Field
                                        name="discount_value"
                                        type="number"
                                        className="w-[150px] p-2 rounded-[6px] border-[1px]"
                                    />
                                    <ErrorMessage
                                        name="discount_value"
                                        component="div"
                                        className=" text-red-500 text-[12px] mt-1 top-4" />
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 items-center">
                                <p>Min. Order</p>
                                <div>
                                    <Field
                                        name="minimum_order"
                                        type="number"
                                        className="w-[150px] p-2 rounded-[6px] border-[1px]"
                                    />
                                    <ErrorMessage
                                        name="minimum_order"
                                        component="div"
                                        className=" text-red-500 text-[12px] mt-1" />
                                </div>
                            </div>
                            <div className="flex justify-between gap-5 items-center">
                                <p className="text-gray-300">Expire Date</p>
                                <div>
                                    <Field
                                        name="expires_at"
                                        type="date"
                                        className="w-[150px] p-2 rounded-[6px] border-[1px]"
                                    />
                                    <ErrorMessage
                                        name="expired_date"
                                        component="div"
                                        className=" text-red-500 text-[12px] mt-1" />
                                </div>
                            </div>
                            <button type="submit" className=" text-main hover:text-secondary duration-300 hover:bg-main rounded-full w-72 h-10 m-2 mt-4 bg-secondary font-normal">Apply Discount</button>
                        </div>
                    </Form>
                )
            }}

        </Formik>
    )
}