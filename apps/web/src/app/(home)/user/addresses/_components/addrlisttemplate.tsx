export default function AddrListTemplate() {
    return (
        <div className="max-w-lg mx-auto p-4 bg-secondary shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Address Details</h2>
            <div className="p-4 border border-gray-300 rounded-md">
                <p className="text-main-black">
                    1234 Elm Street, Apt 567, Some Complex,
                </p>
                <hr className="my-2 border-gray-300" />
                <p>Binong, Bandung, Jawa Barat, 40268</p>
            </div>
        </div>
    );
}
