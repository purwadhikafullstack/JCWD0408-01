export default function DetailProductRightBar() {
    return (
        <div className="flex flex-col gap-8 w-[400px]">
            <div className="flex flex-col gap-5 items-start">
                <h1 className="text-[24px] font-bold">Nama Produk</h1>
                <p className="text-[14px] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat cum eos perferendis ut quia porro? Aliquam, nihil tempora. Deserunt cupiditate voluptatem, explicabo illo est enim?</p>
                <p className="text-[14px]">Harga Produk</p>
                <p className="text-[14px]">Stok Produk</p>
                <div className="border-[1px] w-[400px] mt-12"></div>
            </div>
            <div className=" flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-bold">Quantity</p>
                    <input type="number" name="" id="" className="border-[1px] p-2 rounded-[6px] w-16" placeholder="" />
                </div>
                <div className="flex flex-col gap-2">
                    <button className="border-main border-[1px] text-main rounded-[6px] p-2 duration-300 active:scale-95">Add to Cart</button>
                    <button 
                        className="bg-main text-white rounded-[6px] p-2  duration-300 active:scale-95"
                        
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}