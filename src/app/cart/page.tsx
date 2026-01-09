"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 space-y-6">
          <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-zinc-300" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-zinc-900">Your cart is empty</h2>
            <p className="text-zinc-500">Looks like you have not added anything yet.</p>
          </div>
          <Button asChild className="w-full max-w-[200px] rounded-2xl">
            <Link href="/">Start Shopping</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      
      <main className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">Shopping Cart</h2>
        
        <div className="space-y-4 pb-32">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -100 }}
                className="relative group"
              >
                {/* Swipe-to-remove background */}
                <div className="absolute inset-0 bg-red-50 rounded-3xl flex items-center justify-end px-6 -z-10">
                  <Trash2 className="text-red-500 w-5 h-5" />
                </div>

                <motion.div
                  drag="x"
                  dragConstraints={{ left: -100, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -80) removeFromCart(item.id);
                  }}
                  className="bg-white border border-zinc-100 p-4 rounded-3xl flex gap-4 shadow-sm"
                >
                  <div className="relative w-20 h-20 bg-zinc-50 rounded-2xl overflow-hidden shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm font-medium text-zinc-500">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-zinc-50 rounded-xl p-0.5 border border-zinc-100">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Summary Footer */}
      <div className="absolute bottom-0 inset-x-0 p-6 bg-white border-t border-zinc-100 space-y-4">
        <div className="flex items-center justify-between text-zinc-500">
          <span className="text-sm font-medium">Subtotal</span>
          <span className="text-base font-semibold text-zinc-900">
            {formatPrice(cartTotal)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-500">Shipping</span>
          <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">
            Free
          </span>
        </div>
        <div className="pt-2 flex items-center justify-between border-t border-zinc-50">
          <span className="text-lg font-bold text-zinc-900">Total</span>
          <span className="text-2xl font-black text-black">
            {formatPrice(cartTotal)}
          </span>
        </div>
        
        <Link href="/checkout" className="block">
          <Button className="w-full h-14 rounded-2xl text-base gap-3 shadow-xl shadow-black/10 mt-2">
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
