import Image from "next/image";

export default function CardItems() {
    return (
        <div className="flex flex-col gap-2 hover:scale-105 duration-150">
            <div>
                <Image src="/dummy-image.jpg" alt="Discount" width={200} height={300} className="rounded-[6px]" />
            </div>
            <div className="border-[1px] mt-2"></div>
            <p className="font-bold">Nama Barang</p>
            <p className="text-[14px]">Harga Barang</p>
        </div>
    )
}