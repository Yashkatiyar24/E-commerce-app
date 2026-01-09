export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutData {
  userDetails: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
}
