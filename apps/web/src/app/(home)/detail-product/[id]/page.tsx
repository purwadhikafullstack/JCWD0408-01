import DetailProductRightBar from "@/components/detail-product/details";
import RecomendedItemsBottom from "@/components/detail-product/recomended-items";
import Image from "next/image";

export default function DetailProduct() {
    return (
        <div>
            <div className="flex justify-center items-start gap-5 p-5 mt-10">
                <div>
                    <Image src="/dummy-image.jpg" alt="Discount" width={500} height={300} className="rounded-[6px]" />
                    <p></p>
                </div>
                <div className="">
                    <DetailProductRightBar />
                </div>
            </div>
            <div className=" my-10">
                <RecomendedItemsBottom />
            </div>
        </div>
    )
}