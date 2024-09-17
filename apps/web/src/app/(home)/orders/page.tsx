"use client";
import Cart from "./_components/cart/cart";
import { CartProvider } from "./_components/cart/cartContext";
import CartCount from "./_components/cart/cartButton";
import ProductList from "./_components/cart/productList";

export default function Orders() {
  return (
    <CartProvider>
      <div className="p-4">
        <CartCount />
        <ProductList />
      </div>
    </CartProvider>
  );
}
