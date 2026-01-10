import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItem, OrderSummary, Product } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("cart_items");
        const storedOrder = await AsyncStorage.getItem("cart_last_order");
        if (storedItems) setItems(JSON.parse(storedItems));
        if (storedOrder) setLastOrder(JSON.parse(storedOrder));
      } catch (e) {
        console.warn("Failed to load cart", e);
      } finally {
        setHydrated(true);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem("cart_items", JSON.stringify(items)).catch((e) =>
      console.warn("Failed to persist cart", e),
    );
  }, [items, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (lastOrder) {
      AsyncStorage.setItem("cart_last_order", JSON.stringify(lastOrder)).catch(
        (e) => console.warn("Failed to persist order", e),
      );
    } else {
      AsyncStorage.removeItem("cart_last_order").catch((e) =>
        console.warn("Failed to clear order", e),
      );
    }
  }, [lastOrder, hydrated]);

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
