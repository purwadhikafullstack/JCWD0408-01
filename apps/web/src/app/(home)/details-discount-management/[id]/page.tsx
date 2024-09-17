import Discount from "@/components/discount-management/list-discount";
import Image from "next/image";

export default function DiscountManagementPage() {
    return (
        <div className="h-svh">
            <div className="flex gap-10 justify-center items-center">
                <div>
                    <div className="flex flex-col w-[600px]">
                        <div className="flex justify-center m-5">
                            <Image src="/dummy-image.jpg" alt="About Us" width={500} height={100} />
                        </div>
                        <div>
                            <Discount namadiscount="DISCOUNT 1"  nominaldiscount={200000}/>
                            <Discount namadiscount="DISCOUNT 2"  nominaldiscount={200000}/>
                            <Discount namadiscount="DISCOUNT 3"  nominaldiscount={200000}/>
                            <Discount namadiscount="DISCOUNT 4"  nominaldiscount={200000}/>
                            <Discount namadiscount="DISCOUNT 5"  nominaldiscount={200000}/>
                            <Discount namadiscount="DISCOUNT 6"  nominaldiscount={200000}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col">
                        <div className="">GRID 3</div>
                        <div>GRID 4</div>
                    </div>
                </div>
            </div>
        </div>
    )
}