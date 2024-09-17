import React, { useState } from "react";
import { useCart } from "./cartContext";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./cart";

const CartCount: React.FC = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="relative inline-block cursor-pointer" onClick={openModal}>
      <FaShoppingCart size={24} />
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          {cartCount}
        </span>
      )}
      {modalIsOpen && <Cart onClose={closeModal} />}
    </div>
  );
};

export default CartCount;
