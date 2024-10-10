export default function UserCartDetails({ nama, created_at, email }: { nama: string, created_at: string, email: string }) {
    return (
        <div className="flex lg:flex-row flex-wrap lg:justify-between justify-center text-[14px] items-center lg:h-10 h-60 rounded-[10px] hover:bg-secondary hover:border-secondary duration-200 border-[1px] w-full gap-2">
            <p className="p-2 lg:pl-10 md:w-[250px]">{nama}</p>
            <p className="md:w-[250px]">Created : {new Date(new Date(created_at).setDate(new Date().getDate() - 30)).toLocaleString("en-US", { timeZone: "Asia/Bangkok" })}</p>
            <p className="md:w-[200px] text-right">{email}</p>
            <div>

            </div>
            {/* <button type="button" className="" onClick={toggleModal}>
                    <IoIosMore size={32} className="text-main hover:text-secondary duration-300 hover:bg-main hover:rounded-full md:mr-10" />
                </button>
                {isModalOpen && (
                    <div className="absolute  bg-white border rounded-[10px] shadow-lg  right-10 duration-300">
                        <ul className="">
                            <li className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary  cursor-pointer">Delete User</li>
                            <button className="p-2 hover:bg-main rounded-[6px]  duration-200 hover:text-secondary w-full cursor-pointer" onClick={toggleModal}>Cancel</button>
                        </ul>
                    </div>
                )} */}
        </div>
    )
}