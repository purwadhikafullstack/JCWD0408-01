import React, { useState } from "react";
import ReactDOM from "react-dom";
import CartItem from "./cartItem";
import { useCart } from "./cartContext";
import Link from "next/link";

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { cart, removeFromCart } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<string | null>(null);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const discounts = [
    { code: "DISCOUNT10", percentage: 10 },
    { code: "DISCOUNT20", percentage: 20 },
    { code: "DISCOUNT30", percentage: 30 },
  ];

  const totalItemPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = discounts.find((d) => d.code === appliedDiscount);
  const discountPrice = discount
    ? (totalItemPrice * discount.percentage) / 100
    : 0;

  const totalPrice = totalItemPrice - discountPrice;

  const handleDiscountClick = (code: string) => {
    setAppliedDiscount((prev) => (prev === code ? null : code));
  };

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleRemoveSelected = () => {
    checkedItems.forEach((id) => removeFromCart(id));
    setCheckedItems([]);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg shadow-xl p-6 z-10 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Cart</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
          >
            &times;
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            Add some products here.
          </div>
        ) : (
          <>
            <ul className="space-y-4 mb-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  stock={item.stock}
                  quantity={item.quantity}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  isChecked={checkedItems.includes(item.id)}
                  onCheckboxChange={handleCheckboxChange}
                />
              ))}
            </ul>
            {checkedItems.length > 0 && (
              <button
                className="bg-red-500 text-sm font-medium text-white py-2 px-4 rounded hover:bg-red-700 mb-4 w-full"
                onClick={handleRemoveSelected}
              >
                Remove Selected Items
              </button>
            )}
            <div className="mb-4">
              <button
                className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none"
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              >
                <span>Available Discounts</span>
                <svg
                  className={`w-5 h-5 text-blue-500 transform transition-transform ${
                    isAccordionOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {isAccordionOpen && (
                <div className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <ul>
                    {discounts.map((discount) => (
                      <li
                        key={discount.code}
                        className="flex justify-between items-center mb-2"
                      >
                        <span>
                          {discount.code} - {discount.percentage}%
                        </span>
                        <button
                          className={`px-2 py-1 rounded transition duration-300 ${
                            appliedDiscount === discount.code
                              ? "bg-green-500 text-white"
                              : "bg-blue-500 text-white hover:bg-blue-700"
                          }`}
                          onClick={() => handleDiscountClick(discount.code)}
                        >
                          {appliedDiscount === discount.code
                            ? "Applied"
                            : "Apply"}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="text-sm font-normal border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span>Total Item Price:</span>
                <span className="text-right">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(totalItemPrice)}
                </span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-green-500 mb-2">
                  <span>Discount ({appliedDiscount}):</span>
                  <span className="text-right">
                    -
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(discountPrice)}
                  </span>
                </div>
              )}
              <div className="flex justify-between mt-2 text-base font-medium border-t border-gray-200 pt-2">
                <span>Total Price:</span>
                <span
                  className={`text-right ${
                    appliedDiscount ? "text-green-500" : ""
                  }`}
                >
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(totalPrice)}
                </span>
              </div>
            </div>
            <Link href="/orders/create-order">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4 w-full">
                Checkout
              </button>
            </Link>
            <a className="text-xs font-extralight">
              Estimated Shipping Cost will be added once you click checkout
            </a>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Cart;
