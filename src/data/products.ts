import { Product } from "../types";

export const categories = ["Trending", "Outerwear", "Tops", "Sneakers", "Accessories"];

export const paymentMethods = ["UPI", "Card", "Cash on Delivery"];

export const products: Product[] = [
  {
    id: "p1",
    name: "Parisian Pre-Spring Coat",
    price: 15999,
    category: "Winterwear",
    description: "Soft tailored coat with a clean lapel and relaxed drape.",
    image:
      "https://image.hm.com/content/dam/global_campaigns/season_03/women/startpage-category-entries-assets/wk02/Jackets-Coats-WCE-wk02.jpg?imwidth=1200",
    gallery: [
      "https://image.hm.com/content/dam/global_campaigns/season_03/women/startpage-category-entries-assets/wk02/Jackets-Coats-WCE-wk02.jpg?imwidth=1200",
      "https://image.hm.com/content/dam/global_campaigns/season_03/women/startpage-category-entries-assets/wk02/Jackets-Coats-WCE-wk02.jpg?imwidth=1536",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "p2",
    name: "Cloud Brushed Knit",
    price: 2499,
    category: "Tops",
    description: "Featherlight knit with a plush texture and modern crew neck.",
    image:
      "https://image.hm.com/content/dam/global_campaigns/season_03/women/startpage-category-entries-assets/wk02/Tops-WCE-wk02.jpg?imwidth=1200",
    gallery: [
      "https://image.hm.com/content/dam/global_campaigns/season_03/women/startpage-category-entries-assets/wk02/Tops-WCE-wk02.jpg?imwidth=1200",
      "https://image.hm.com/content/dam/global_campaigns/season_03/women/startpage-category-entries-assets/wk02/Tops-WCE-wk02.jpg?imwidth=1536",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "p3",
    name: "Sculpted Leather Jacket",
    price: 8999,
    category: "Outerwear",
    description: "Structured leather with clean seams and a minimal collar.",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQv8JLRlOypw3F_h7eByOQcVmWDlW5z9JFJom2IVGqVrFCz_9uQUfXcFZeZQKtxIQndD2N6QJUe4LumjX-2xybgeDfwV86ma5OAefr91bE",
    gallery: [
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQv8JLRlOypw3F_h7eByOQcVmWDlW5z9JFJom2IVGqVrFCz_9uQUfXcFZeZQKtxIQndD2N6QJUe4LumjX-2xybgeDfwV86ma5OAefr91bE",
      "https://images.unsplash.com/photo-1496747611180-206a5c8c46c2?auto=format&fit=crop&w=1200&q=80",
    ],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "p4",
    name: "Studio Denim Flare",
    price: 3499,
    category: "Denim",
    description: "High-rise flare denim with deep indigo wash.",
    image:
      "https://image.hm.com/content/dam/ind-local-assets/IN_WK2_Denim_CE.jpg?imwidth=1200",
    gallery: [
      "https://image.hm.com/content/dam/ind-local-assets/IN_WK2_Denim_CE.jpg?imwidth=1200",
      "https://image.hm.com/content/dam/ind-local-assets/IN_WK2_Denim_CE.jpg?imwidth=1536",
    ],
    sizes: ["24", "26", "28", "30", "32"],
  },
  {
    id: "p5",
    name: "Minimal Jersey Longsleeve",
    price: 1299,
    category: "Basics",
    description: "Clean, close-to-body jersey with fine ribbed collar.",
    image:
      "https://image.hm.com/content/dam/global_campaigns/season_03/women/startpage-category-entries-assets/wk02/Basic-WCE-wk02.jpg?imwidth=1200",
    gallery: [
      "https://image.hm.com/content/dam/global_campaigns/season_03/women/startpage-category-entries-assets/wk02/Basic-WCE-wk02.jpg?imwidth=1200",
      "https://image.hm.com/content/dam/global_campaigns/season_03/women/startpage-category-entries-assets/wk02/Basic-WCE-wk02.jpg?imwidth=1536",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "p6",
    name: "Virat Black Rectangular Sunglasses",
    price: 1999,
    category: "Accessories",
    description:
      "Channel unmatched confidence with the Virat Timeless Black Sunglasses. Featuring a clean rectangular silhouette, jet-black frame, and deep black lenses, these shades are a masterclass in minimalism and strength. Inspired by Virat’s signature edge and effortless cool, they offer UV400 protection with sharp, no-nonsense style.",
    image:
      "https://salty.co.in/cdn/shop/files/SG0046-BK-BK_Model2.jpg?v=1764835843&width=1000",
    gallery: [
      "https://salty.co.in/cdn/shop/files/SG0046-BK-BK_Model2.jpg?v=1764835843&width=1000",
    ],
    sizes: ["OS"],
  },
];

export const getProductById = (id: string) =>
  products.find((product) => product.id === id);
