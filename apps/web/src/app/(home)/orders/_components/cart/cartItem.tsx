import React, { useState } from "react";
import { useCart } from "./cartContext";
import { FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface CartItemProps {
  id: number;
  name: string;
  stock: number;
  quantity: number;
  price: number;
  imageUrl: string;
  isChecked: boolean;
  onCheckboxChange: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  stock,
  quantity,
  price,
  imageUrl,
  isChecked,
  onCheckboxChange,
}) => {
  const { updateCart, removeFromCart } = useCart();

  const remainingStock = stock - quantity;

  const totalPrice = price * quantity;

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(totalPrice);

  return (
    <AnimatePresence>
      <motion.li
        className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-md mb-4 bg-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        key={id}
      >
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onCheckboxChange(id)}
          className="mr-4"
        />
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex flex-col flex-grow ml-4">
          <span className="font-semibold text-gray-800">{name}</span>
          <span className="text-gray-600">{formattedPrice}</span>
          {remainingStock < 5 && (
            <span className="text-red-500 text-sm">
              Only {remainingStock} left in stock!
            </span>
          )}
        </div>
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Quantity:</span>
            <input
              type="number"
              className="w-20 p-2 border border-gray-300 rounded-md text-center"
              value={quantity}
              min="0"
              max={stock}
              onChange={(e) => updateCart(id, parseInt(e.target.value))}
            />
          </div>
          {quantity === 1 && (
            <button
              className="text-red-600 px-4 py-2 rounded-none hover:text-red-700 flex items-center"
              onClick={() => removeFromCart(id)}
            >
              <motion.div
                whileHover={{ rotate: [0, 10, -10, 10, -10, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 1,
                }}
              >
                <FaTrashAlt />
              </motion.div>
            </button>
          )}
        </div>
      </motion.li>
    </AnimatePresence>
  );
};

export default CartItem;