import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopease - Calm Minimal Shop",
  description:
    "A calm, gesture-friendly e-commerce experience showcasing cart and checkout flows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FDFCF9] min-h-screen text-zinc-900`}
      >
        <CartProvider>
          <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl relative flex flex-col">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
