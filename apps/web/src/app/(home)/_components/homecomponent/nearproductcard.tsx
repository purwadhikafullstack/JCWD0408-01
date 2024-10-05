export default function NearProductCard() {
    return (
      <div className="max-w-xs rounded-lg overflow-hidden shadow-2xl bg-secondary transform transition duration-500 hover:shadow-main">
        <div className="p-4">
          <img 
            className="w-full h-56 object-cover object-center rounded-lg shadow-md border-2 border-main" 
            src="/placeholder.svg?height=400&width=600" 
            alt=""
          />
        </div>
        <div className="px-6 py-4">
          <div className="flex flex-col mb-2">
            <h3 className="font-bold text-lg text-main-black leading-tight mb-1">Luxe Chrono Watch</h3>
            <h1 className="text-xl font-bold text-main">$599.99</h1>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Elegant timepiece with precision movement and sapphire crystal.
          </p>
          <button className="bg-main hover:bg-main-black text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full">
            See Details
          </button>
        </div>
      </div>
    )
  }