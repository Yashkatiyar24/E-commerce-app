"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";

export default function OrderConfirmationPage() {
  const [orderNumber] = useState(() => Math.floor(Math.random() * 90000) + 10000);

  return (
    <div className="flex flex-col h-screen bg-white">
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center shadow-2xl shadow-black/20"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-zinc-500 font-medium">
            Thank you for your purchase. Your order <span className="text-zinc-900 font-bold">#{orderNumber}</span> has been placed successfully.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100 space-y-4"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500 font-medium">Estimated Delivery</span>
            <span className="text-zinc-900 font-bold">2-3 Business Days</span>
          </div>
          <div className="h-px bg-zinc-200/50" />
          <p className="text-xs text-zinc-400 leading-relaxed">
            We have sent a confirmation email with your order details and tracking information.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full pt-4"
        >
          <Link href="/" className="block">
            <Button className="w-full h-14 rounded-2xl text-base gap-3 shadow-xl shadow-black/10">
              <ShoppingBag className="w-5 h-5" />
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
