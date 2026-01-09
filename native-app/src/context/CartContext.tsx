import React, { createContext, useContext, useMemo, useState } from "react";
import { CartItem, OrderSummary, Product } from "../types";

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  lastOrder: OrderSummary | null;
  recordOrder: (order: OrderSummary) => void;
  resetOrder: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<OrderSummary | null>(null);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setItems([]);

  const recordOrder = (order: OrderSummary) => setLastOrder(order);
  const resetOrder = () => setLastOrder(null);

  const { cartCount, cartTotal } = useMemo(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    return { cartCount: count, cartTotal: total };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        lastOrder,
        recordOrder,
        resetOrder,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
