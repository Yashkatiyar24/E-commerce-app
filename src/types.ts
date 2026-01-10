export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  gallery: string[];
  sizes: string[];
  tags?: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderSummary = {
  id: string;
  items: CartItem[];
  total: number;
  address?: {
    line: string;
    city: string;
    state: string;
    pincode: string;
  };
};
