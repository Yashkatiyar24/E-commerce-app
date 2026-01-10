import { Product } from "../types";

export const categories = ["Trending", "Outerwear", "Tops", "Sneakers", "Accessories"];

export const paymentMethods = ["UPI", "Card", "Cash on Delivery"];

export const products: Product[] = [
  {
    id: "p1",
    name: "Ashen Fleece Hoodie",
    price: 97,
    category: "Outerwear",
    description:
      "Soft brushed fleece with a relaxed fit and clean lines for everyday layering.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tags: ["trending"],
  },
  {
    id: "p2",
    name: "Monochrome Knit Cardigan",
    price: 84,
    category: "Tops",
    description:
      "Lightweight knit with a soft drape, tonal buttons, and a cozy shawl collar.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["trending"],
  },
  {
    id: "p3",
    name: "Sandstone Bomber",
    price: 128,
    category: "Outerwear",
    description:
      "Structured bomber with matte hardware, hidden pockets, and a smooth liner.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    tags: ["trending"],
  },
  {
    id: "p4",
    name: "Softstep Runner",
    price: 110,
    category: "Sneakers",
    description:
      "Featherweight knit upper with plush cushioning for all-day movement.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    ],
    sizes: ["38", "39", "40", "41", "42", "43"],
  },
  {
    id: "p5",
    name: "Minimal Canvas Tote",
    price: 48,
    category: "Accessories",
    description:
      "Reinforced canvas with interior sleeve pockets and softly rolled handles.",
    image:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    ],
    sizes: ["OS"],
  },
  {
    id: "p6",
    name: "Everyday Cotton Tee",
    price: 42,
    category: "Tops",
    description:
      "Ultra-soft combed cotton with a relaxed shoulder and lightly curved hem.",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

export const getProductById = (id: string) =>
  products.find((product) => product.id === id);
