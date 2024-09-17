"use client";
import { CartProvider, useCart } from "./../_components/cart/cartContext";

const CreateOrder = () => {
  const { cart, user } = useCart();

  return (
    <div>
      <h1>Create Order</h1>
      <h2>User Information</h2>
      <p>Registered: {user.isRegistered ? "Yes" : "No"}</p>
      <p>Verified: {user.isVerified ? "Yes" : "No"}</p>
      <h2>Cart Items</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity} - Price: {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CreateOrderPage = () => {
  return (
    <CartProvider>
      <CreateOrder />
    </CartProvider>
  );
};

export default CreateOrderPage;