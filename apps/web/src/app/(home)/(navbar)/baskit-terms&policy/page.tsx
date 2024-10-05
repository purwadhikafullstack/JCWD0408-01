'use client'

import Image from "next/image";
import { motion } from "framer-motion";

export default function BaskitTermsPolicy() {
    return (
        <motion.div className="w-full mt-24 items-center sm:p-20">
            <motion.div initial={{ opacity: 0, translateY: -10 }}
                    animate={{ opacity: 1, translateY: 0 }}>
                <Image src={'/logo/baskit.svg'} alt="Baskit Logo" width={250} height={100} />
            </motion.div>
            <div className="flex flex-col gap-10 p-10">
                <motion.div className="border-[1px] border-main rounded-[6px] bg-main/40 backdrop-blur-sm text-secondary"
                    initial={{ opacity: 0, translateY: -10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="bg-main rounded-[6px] p-5">Privacy Policy</p>
                    <p className="p-5">We value your privacy and are committed to protecting the personal data you provide. The information we collect includes your name, address, email, phone number, and transaction details. This data is used to process orders, manage your account, and enhance your shopping experience. We will not share your personal information with third parties without your consent, except as required by law.</p>
                </motion.div>
                <motion.div className="border-[1px] border-main rounded-[6px] bg-main/40 backdrop-blur-sm text-secondary"
                    initial={{ opacity: 0, translateY: -10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 0.4 }}
                    >
                    <p className="bg-main rounded-[6px] p-5">Terms of Service</p>
                    <p className="p-5">By using our services, you agree to comply with all applicable rules. Users must be over 18 years old or use the service with parental/guardian permission. We provide a platform for sellers and buyers to transact. We are not responsible for the quality of products sold by sellers, but we provide a system to manage disputes. Violations of these terms of service may result in account suspension.</p>
                </motion.div>
                <motion.div className="border-[1px] border-main rounded-[6px] bg-main/40 backdrop-blur-sm text-secondary"
                    initial={{ opacity: 0, translateY: -10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 0.6 }}
                    >
                    <p className="bg-main rounded-[6px] p-5">Cookie Policy</p>
                    <p className="p-5">Our website uses cookies to collect information about user preferences and enhance the shopping experience. Cookies allow us to store items in your shopping cart and customize product recommendations. You can disable cookies through your browser settings, but this may affect the functionality of our website.</p>
                </motion.div>
                <p className="text-center border-[1px] p-2 bg-blue-200 rounded-[6px]  text-blue-900 text-[12px]">Please make sure to read these policies in detail on the relevant pages, as this is only a brief summary.</p>
            </div>
        </motion.div>
    )
}