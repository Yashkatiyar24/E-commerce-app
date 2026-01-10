"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation, type PanInfo } from "framer-motion";
import { Plus, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "./Button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const controls = useAnimation();

  const handleDragEnd = async (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > 100) {
      // Swipe right to add to cart
      addToCart(product);
      await controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });
    } else {
      controls.start({ x: 0 });
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 150 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      className="relative group bg-white rounded-[2rem] overflow-hidden border border-zinc-100/50 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
    >
      {/* Swipe background indicator */}
      <div className="absolute inset-y-0 left-0 w-24 bg-zinc-900 flex items-center justify-center -z-10 opacity-0 group-hover:opacity-10 transition-opacity">
        <ShoppingCart className="text-white w-6 h-6" />
      </div>

      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-zinc-50">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4 space-y-1">
          <h3 className="text-sm font-medium text-zinc-900 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          <p className="text-lg font-semibold text-black">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <Button
          size="sm"
          className="w-full rounded-xl gap-2 text-xs"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
        >
          <Plus className="w-3.5 h-3.5" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
