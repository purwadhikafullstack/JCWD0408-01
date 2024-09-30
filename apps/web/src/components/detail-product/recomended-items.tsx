import CardItems from "./sub-detail-product/card-items";

export default function RecomendedItemsBottom() {
    return (
        <div className="flex flex-col justify-center items-center gap-5 px-10">
            <div className="border-[1px] w-full border-accent "></div>
            <h1 className="text-[28px] font-bold">Hot Sale</h1>
            <div className="flex flex-wrap justify-center gap-10 mx-40">
                <CardItems />
                <CardItems />
                <CardItems />
                <CardItems />
                <CardItems />
                <CardItems />
                <CardItems />
                <CardItems />
            </div>
        </div>
    )
}