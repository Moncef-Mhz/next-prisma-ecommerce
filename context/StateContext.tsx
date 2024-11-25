"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { Product } from "@/types/types";

interface StateContextType {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  AddToCart: (product: Product, quantity: number) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

// Create the context
const Context = createContext<StateContextType | undefined>(undefined);

export const StateContext = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem("cartItems");
      return storedItems ? JSON.parse(storedItems) : [];
    }
    return [];
  });

  const [showCart, setShowCart] = useState(false);

  const AddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((current) => {
      const existingProduct = current.find((item) => item.id === product.id);
      if (existingProduct) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      }
      return [...current, { ...product, quantity }];
    });
  };

  const removeFromCart = (product: Product) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => item.quantity! > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  // Debounce localStorage updates
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, 300);

    return () => clearTimeout(timer);
  }, [cartItems]);

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      cartItems,
      setCartItems,
      showCart,
      setShowCart,
      AddToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
    }),
    [cartItems, showCart]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useStateContext = () => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("useStateContext must be used within a StateContext");
  }
  return ctx;
};
