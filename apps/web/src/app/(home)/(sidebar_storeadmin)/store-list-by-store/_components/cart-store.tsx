export default function CartStorebyStore({ nama, created_at, nama_pengelola }: { nama: string, created_at: string, nama_pengelola: string }) {
    return (

        <div className=" p-5 w-[220px] h-[250px] border-[1px] rounded-[6px] flex justify-center  flex-col gap-8 hover:border-secondary hover:bg-secondary duration-200 hover:text-[20px] hover:scale-105">
            <p className="font-bold text-[18px] hover:text-[20px] duration-200 h-16">{nama}</p>
            <p className=" text-[14px]">{created_at.split("T")[0]}</p>
            <div>
                <p className=" text-[14px]">PENGELOLA</p>
                <p className="text-[12px] font-bold">{nama_pengelola}</p>
            </div>
        </div>

    )
}