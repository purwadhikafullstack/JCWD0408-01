import Sidebar from "@/components/admin-dashboard/sidebar"
import { VscAccount } from "react-icons/vsc"

export default function DetailProduct() {
    return (
        <div>
            <Sidebar />
            <div className="lg:ml-64">
                <div className="flex justify-start items-center gap-5 p-5">
                    <div className="flex justify-start items-center gap-5 p-10 pt-16">
                        <div className="">
                            <VscAccount size={64} color="grey" />
                        </div>
                        <div>
                            <h1 className="font-extrabold text-[24px]">HALLO!</h1>
                            <h1>Admin $ID</h1>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col pl-10 text-[20px] font-medium">
                    <p>Products</p>
                </div>
            </div>
        </div>
    )
}