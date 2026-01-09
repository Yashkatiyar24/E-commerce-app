import { Product } from "@/types";

export const CATEGORIES = ["All", "Trending", "Shoes", "Shirts", "Accessories"];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Minimalist Leather Sneakers",
    price: 120,
    category: "Shoes",
    description: "Premium handcrafted leather sneakers with a clean, timeless design. Perfect for both casual and formal occasions.",
    images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800"],
  },
  {
    id: "2",
    name: "Classic White T-Shirt",
    price: 45,
    category: "Shirts",
    description: "High-quality organic cotton t-shirt with a perfect fit and soft feel. A wardrobe essential.",
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800"],
  },
  {
    id: "3",
    name: "Canvas Weekender Bag",
    price: 85,
    category: "Accessories",
    description: "Durable canvas bag with leather accents. Spacious enough for all your weekend essentials.",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"],
  },
  {
    id: "4",
    name: "Performance Running Shoes",
    price: 150,
    category: "Shoes",
    description: "Lightweight and breathable running shoes designed for maximum comfort and speed.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"],
  },
  {
    id: "5",
    name: "Linen Button-Down Shirt",
    price: 75,
    category: "Shirts",
    description: "Breathable linen shirt in a relaxed fit. Ideal for warm summer days.",
    images: ["https://images.unsplash.com/photo-1596755094514-f87034a264c6?auto=format&fit=crop&q=80&w=800"],
  },
  {
    id: "6",
    name: "Modern Analog Watch",
    price: 195,
    category: "Accessories",
    description: "Elegant analog watch with a minimalist face and genuine leather strap.",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"],
  },
];
