import React from 'react';
import { useCart } from './cartContext';

const ProductList: React.FC = () => {
  const { productList, addToCart } = useCart();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="space-y-4">
        {productList.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center p-4 border rounded shadow"
          >
            <span>
              {product.name} - Stock: {product.stock}
            </span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;