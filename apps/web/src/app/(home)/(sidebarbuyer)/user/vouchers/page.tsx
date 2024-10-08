'use client'

import Image from "next/image";
import VoucherList from "./_components/voucherlist";

export default function MyVoucher() {
    return (
        <div>
            <Image src={'/discountvoucher.svg'} width={100} height={100} alt=""/>
            <VoucherList/>
        </div>
    )
}