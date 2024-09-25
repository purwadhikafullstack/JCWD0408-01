import { motion } from 'framer-motion';
import * as yup from 'yup';

const createProductbySuperAdmin = yup.object().shape({
    name: yup.string().required("name is required"),
    desc: yup.string().required("description is required"),
    price: yup.number().required("price is required"),
    image: yup.string().required("image is required"),
})

export default function CreateProduct() {
    const initialValues = {
        name: "",
        desc: "",
        price: "",
        image: null
    }

    return (
        <motion.div className='flex flex-col gap-5 '
            initial={{ opacity: 0.5, translateY: -5 }}
            animate={{ opacity: 1, translateY: 0, transition: { duration: 0.25 } }}>
            <h1>Create Product</h1>
            <div className='flex gap-5'>
                <p>Name</p>
                <p>Desc</p>
                <p>Price</p>
                <p>Image</p>
            </div>
        </motion.div>
    )
}