"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, Search, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const { cartCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-zinc-100/50">
      <div className="flex items-center gap-4">
        {!isHome && (
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-zinc-100 active:scale-90 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
          Shopease
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {isHome && (
          <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors">
            <Search className="w-5 h-5 text-zinc-500" />
          </button>
        )}
        <Link href="/cart" className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors">
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-300">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
