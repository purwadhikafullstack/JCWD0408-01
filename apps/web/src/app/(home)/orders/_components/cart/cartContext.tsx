import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  imageUrl: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface User {
  isRegistered: boolean;
  isVerified: boolean;
}

interface CartContextType {
  cart: CartItem[];
  productList: Product[];
  user: User;
  addToCart: (productId: number) => void;
  updateCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    stock: 10,
    price: 14000,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    stock: 5,
    price: 25000,
    imageUrl: "https://via.placeholder.com/150",
  },
];

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [productList, setProductList] = useState<Product[]>(dummyProducts);
  const [user] = useState<User>({ isRegistered: true, isVerified: true });

  const addToCart = (productId: number) => {
    const product = productList.find((p) => p.id === productId);
    if (!product) {
      alert("Product not found");
      return;
    }
    if (product.stock <= 0) {
      alert("Product is out of stock");
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setProductList((prevProductList) =>
      prevProductList.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - 1 } : p
      )
    );
  };

  const updateCart = (productId: number, quantity: number) => {
    const product = productList.find((p) => p.id === productId);
    if (!product) {
      alert("Product not found");
      return;
    }
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (!existingItem) {
        alert("Item not found in cart");
        return prevCart;
      }
      const quantityDifference = quantity - existingItem.quantity;
      if (quantityDifference > 0 && product.stock < quantityDifference) {
        alert("Not enough stock available");
        return prevCart;
      }
      setProductList((prevProductList) =>
        prevProductList.map((p) =>
          p.id === productId ? { ...p, stock: p.stock - quantityDifference } : p
        )
      );
      if (quantity === 0) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (productId: number) => {
    const existingItem = cart.find((item) => item.id === productId);
    if (!existingItem) {
      alert("Item not found in cart");
      return;
    }
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    setProductList((prevProductList) =>
      prevProductList.map((p) =>
        p.id === productId
          ? { ...p, stock: p.stock + existingItem.quantity }
          : p
      )
    );
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        productList,
        user,
        addToCart,
        updateCart,
        removeFromCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
