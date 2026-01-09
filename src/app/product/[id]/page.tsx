"use client";

import React, { use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { cart, addToCart, updateQuantity } = useCart();
  
  const product = PRODUCTS.find((p) => p.id === id);
  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem?.quantity || 0;

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      drag="x"
      dragConstraints={{ left: 0, right: 100 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 100) router.back();
      }}
      className="flex flex-col flex-1 h-screen overflow-hidden bg-white"
    >
      <Header />
      
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {/* Product Image */}
        <div className="relative aspect-[4/5] w-full bg-zinc-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="px-6 py-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                {product.category}
              </span>
              <span className="text-2xl font-bold text-black">
                {formatPrice(product.price)}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-900">
              Description
            </h3>
            <p className="text-zinc-500 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector UI */}
          <div className="space-y-4 pb-32">
            <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-900">
              Quantity
            </h3>
            <div className="flex items-center gap-6 bg-zinc-50 w-fit p-1 rounded-2xl border border-zinc-100">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white transition-colors disabled:opacity-30"
                disabled={quantity === 0}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-4 text-center font-bold text-zinc-900">{quantity}</span>
              <button
                onClick={() => addToCart(product)}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Button */}
      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-white via-white to-white/80 backdrop-blur-sm border-t border-zinc-100">
        <Button
          className="w-full h-14 rounded-2xl text-base gap-3 shadow-xl shadow-black/10"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag className="w-5 h-5" />
          {quantity > 0 ? "Add More" : "Add to Cart"}
        </Button>
      </div>
    </motion.div>
  );
}
