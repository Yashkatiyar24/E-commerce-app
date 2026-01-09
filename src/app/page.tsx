"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

type Screen = "home" | "detail" | "cart" | "checkout" | "confirmation";

type Product = {
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

type CartItem = {
  product: Product;
  quantity: number;
};

const categories = ["Trending", "Outerwear", "Tops", "Sneakers", "Accessories"];

const products: Product[] = [
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

const paymentMethods = ["UPI", "Card", "Cash on Delivery"];

export default function Home() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [selectedImage, setSelectedImage] = useState<string>(
    products[0].gallery[0],
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Trending");
  const [searchTerm, setSearchTerm] = useState("");
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [checkoutSwipeStart, setCheckoutSwipeStart] = useState<number | null>(
    null,
  );
  const [form, setForm] = useState({
    user: { name: "", email: "", phone: "" },
    address: { line: "", city: "", state: "", pincode: "" },
    paymentMethod: "UPI",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState<string | null>(null);
  const [submittedCart, setSubmittedCart] = useState<CartItem[]>([]);
  const [submittedTotal, setSubmittedTotal] = useState<number>(0);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart],
  );

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "Trending"
          ? product.tags?.includes("trending")
          : product.category === activeCategory;
      const matchesSearch = term
        ? product.name.toLowerCase().includes(term)
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { product, quantity }];
    });
    setRecentlyAdded(product.id);
    setTimeout(() => {
      setRecentlyAdded((current) => (current === product.id ? null : current));
    }, 900);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImage(product.gallery[0]);
    setDetailQuantity(1);
    setActiveScreen("detail");
  };

  const validateStep = (step: number) => {
    const stepErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.user.name.trim()) stepErrors.name = "Name is required";
      if (!/\S+@\S+\.\S+/.test(form.user.email))
        stepErrors.email = "Valid email required";
      if (!/^[0-9]{10}$/.test(form.user.phone))
        stepErrors.phone = "Enter a 10-digit number";
    }
    if (step === 2) {
      if (!form.address.line.trim()) stepErrors.line = "Address is required";
      if (!form.address.city.trim()) stepErrors.city = "City is required";
      if (!form.address.state.trim()) stepErrors.state = "State is required";
      if (!/^[0-9]{5,6}$/.test(form.address.pincode))
        stepErrors.pincode = "Enter a 5 or 6 digit code";
    }
    if (step === 3) {
      if (!form.paymentMethod) stepErrors.payment = "Select a method";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleStepChange = (direction: "next" | "back") => {
    if (direction === "back") {
      setCheckoutStep((step) => Math.max(1, step - 1));
      return;
    }
    if (validateStep(checkoutStep)) {
      setCheckoutStep((step) => Math.min(3, step + 1));
    }
  };

  const handleStepSwipe = (endX: number) => {
    if (checkoutSwipeStart === null) return;
    const delta = endX - checkoutSwipeStart;
    if (delta > 60) {
      setCheckoutStep((step) => Math.max(1, step - 1));
    }
    if (delta < -60 && validateStep(checkoutStep)) {
      setCheckoutStep((step) => Math.min(3, step + 1));
    }
    setCheckoutSwipeStart(null);
  };

  const handlePlaceOrder = () => {
    if (!validateStep(3)) return;
    setOrderId(`SO-${Date.now().toString().slice(-6)}`);
    setSubmittedCart(cart);
    setSubmittedTotal(cartTotal);
    setCart([]);
    setActiveScreen("confirmation");
  };

  const resetAfterConfirmation = () => {
    setActiveScreen("home");
    setCheckoutStep(1);
    setErrors({});
    setForm({
      user: { name: "", email: "", phone: "" },
      address: { line: "", city: "", state: "", pincode: "" },
      paymentMethod: "UPI",
    });
    setDetailQuantity(1);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] px-3 pb-8 pt-5 text-[var(--foreground)]">
      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-4">
        <header className="flex items-center justify-between rounded-full bg-[var(--card)] px-4 py-3 shadow-sm ring-1 ring-[var(--outline)]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              Shopease
            </p>
            <p className="text-lg font-semibold">Calm curated picks</p>
          </div>
          <button
            onClick={() => setActiveScreen("cart")}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-[var(--outline)] transition hover:shadow"
            aria-label="Open cart"
          >
            <span className="text-xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1 min-w-6 rounded-full bg-black px-1.5 py-0.5 text-center text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </header>

        {activeScreen === "home" && (
          <HomeScreen
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            products={filteredProducts}
            onAdd={addToCart}
            onOpen={openProduct}
            cart={cart}
            recentlyAdded={recentlyAdded}
          />
        )}

        {activeScreen === "detail" && (
          <ProductDetailScreen
            product={selectedProduct}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
            onBack={() => setActiveScreen("home")}
            quantity={detailQuantity}
            setQuantity={setDetailQuantity}
            onAdd={(qty) => addToCart(selectedProduct, qty)}
          />
        )}

        {activeScreen === "cart" && (
          <CartScreen
            cart={cart}
            onBack={() => setActiveScreen("home")}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            total={cartTotal}
            onCheckout={() => {
              if (!cart.length) return;
              setCheckoutStep(1);
              setActiveScreen("checkout");
            }}
          />
        )}

        {activeScreen === "checkout" && (
          <CheckoutScreen
            checkoutStep={checkoutStep}
            form={form}
            errors={errors}
            onBack={() => handleStepChange("back")}
            onNext={() => handleStepChange("next")}
            onSubmit={handlePlaceOrder}
            onChange={setForm}
            onSwipeStart={(x) => setCheckoutSwipeStart(x)}
            onSwipeEnd={handleStepSwipe}
          />
        )}

        {activeScreen === "confirmation" && (
          <ConfirmationScreen
            orderId={orderId}
            items={submittedCart}
            total={submittedTotal}
            onContinue={resetAfterConfirmation}
          />
        )}
      </div>
    </div>
  );
}

function HomeScreen({
  activeCategory,
  setActiveCategory,
  searchTerm,
  setSearchTerm,
  products,
  onAdd,
  onOpen,
  cart,
  recentlyAdded,
}: {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  products: Product[];
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
  cart: CartItem[];
  recentlyAdded: string | null;
}) {
  const productInCart = (productId: string) =>
    cart.find((item) => item.product.id === productId)?.quantity ?? 0;

  return (
    <section className="rounded-[32px] bg-[var(--card)] p-5 shadow-sm ring-1 ring-[var(--outline)]">
      <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-[var(--outline)]">
        <span className="text-lg text-[var(--muted)]">🔍</span>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search minimal staples"
          className="w-full bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none"
        />
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCategory === category
                ? "bg-black text-white shadow-sm"
                : "bg-white text-[var(--foreground)] ring-1 ring-[var(--outline)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={() => onAdd(product)}
            onOpen={() => onOpen(product)}
            quantityInCart={productInCart(product.id)}
            highlight={recentlyAdded === product.id}
          />
        ))}
      </div>

      <p className="mt-4 text-xs text-[var(--muted)]">
        Tap a card for details. Swipe right on a product to quick-add to cart.
      </p>
    </section>
  );
}

function ProductCard({
  product,
  onAdd,
  onOpen,
  quantityInCart,
  highlight,
}: {
  product: Product;
  onAdd: () => void;
  onOpen: () => void;
  quantityInCart: number;
  highlight: boolean;
}) {
  const touchStart = useRef<number | null>(null);
  return (
    <div
      className={`group relative flex cursor-pointer flex-col gap-3 rounded-[28px] bg-white p-3 shadow-sm ring-1 ring-[var(--outline)] transition hover:-translate-y-0.5 hover:shadow ${
        highlight ? "ring-2 ring-[#cdb9a3]" : ""
      }`}
      onClick={onOpen}
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStart.current;
        if (delta > 60) {
          onAdd();
        }
        touchStart.current = null;
      }}
    >
      <div className="relative h-36 overflow-hidden rounded-2xl bg-[var(--background)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="line-clamp-2 text-sm font-semibold leading-5">
          {product.name}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">€{product.price}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="flex h-9 items-center gap-2 rounded-full bg-black px-3 text-xs font-semibold text-white transition hover:-translate-y-px hover:shadow-sm"
          >
            {quantityInCart > 0 ? `In cart • ${quantityInCart}` : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDetailScreen({
  product,
  selectedImage,
  onImageSelect,
  onBack,
  quantity,
  setQuantity,
  onAdd,
}: {
  product: Product;
  selectedImage: string;
  onImageSelect: (url: string) => void;
  onBack: () => void;
  quantity: number;
  setQuantity: (n: number) => void;
  onAdd: (qty: number) => void;
}) {
  const touchStart = useRef<number | null>(null);
  return (
    <section 
      className="relative overflow-hidden rounded-[32px] bg-[var(--card)] p-5 shadow-sm ring-1 ring-[var(--outline)]"
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStart.current;
        if (delta > 80) {
          onBack();
        }
        touchStart.current = null;
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-[var(--outline)]"
          aria-label="Back"
        >
          ←
        </button>
        <p className="text-sm font-semibold text-[var(--muted)]">
          Swipe back to close
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[28px] bg-white">
        <div className="relative h-72 w-full">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            sizes="360px"
            className="object-cover"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto p-3">
          {product.gallery.map((img) => (
            <button
              key={img}
              onClick={() => onImageSelect(img)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl ring-1 ring-[var(--outline)] ${
                selectedImage === img ? "ring-2 ring-black" : ""
              }`}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold leading-6">{product.name}</h2>
            <p className="text-sm text-[var(--muted)]">{product.category}</p>
          </div>
          <p className="rounded-full bg-white px-3 py-1 text-sm font-semibold ring-1 ring-[var(--outline)]">
            €{product.price}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--muted)]">Select size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="rounded-full bg-white px-3 py-2 text-xs font-semibold ring-1 ring-[var(--outline)]"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm leading-6 text-[var(--muted)]">
          {product.description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-white px-3 py-2 ring-1 ring-[var(--outline)]">
        <p className="text-sm font-semibold">Quantity</p>
        <div className="flex items-center gap-3 rounded-full bg-[var(--background)] px-3 py-2">
          <button
            className="h-8 w-8 rounded-full bg-white text-lg ring-1 ring-[var(--outline)]"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            –
          </button>
          <span className="min-w-[24px] text-center font-semibold">
            {quantity}
          </span>
          <button
            className="h-8 w-8 rounded-full bg-white text-lg ring-1 ring-[var(--outline)]"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="sticky bottom-2 left-0 right-0 mt-5">
        <button
          onClick={() => onAdd(quantity)}
          className="flex w-full items-center justify-between rounded-2xl bg-black px-4 py-4 text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow"
        >
          <span className="text-base font-semibold">Add to cart</span>
          <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-black">
            €{product.price * quantity}
          </span>
        </button>
      </div>
    </section>
  );
}

function CartScreen({
  cart,
  onBack,
  onUpdateQuantity,
  onRemove,
  total,
  onCheckout,
}: {
  cart: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  total: number;
  onCheckout: () => void;
}) {
  return (
    <section className="rounded-[32px] bg-[var(--card)] p-5 shadow-sm ring-1 ring-[var(--outline)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-[var(--outline)]"
            aria-label="Back"
          >
            ←
          </button>
          <div>
            <h2 className="text-xl font-semibold leading-6">Your cart</h2>
            <p className="text-xs text-[var(--muted)]">
              Swipe left on an item to remove
            </p>
          </div>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold ring-1 ring-[var(--outline)]">
          {cart.length} items
        </span>
      </div>

      {cart.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-white px-4 py-8 text-center ring-1 ring-[var(--outline)]">
          <p className="text-lg font-semibold">Your cart is quiet</p>
          <p className="text-sm text-[var(--muted)]">
            Add a piece to feel the badge update instantly.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {cart.map((item) => (
          <CartItemRow
            key={item.product.id}
            item={item}
            onRemove={() => onRemove(item.product.id)}
            onUpdateQuantity={(qty) => onUpdateQuantity(item.product.id, qty)}
          />
        ))}
      </div>

      <div className="mt-5 space-y-3 rounded-3xl bg-white p-4 ring-1 ring-[var(--outline)]">
        <div className="flex items-center justify-between text-sm text-[var(--muted)]">
          <span>Subtotal</span>
          <span className="font-semibold text-[var(--foreground)]">€{total}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-[var(--muted)]">
          <span>Shipping</span>
          <span className="font-semibold text-[var(--foreground)]">Included</span>
        </div>
        <div className="flex items-center justify-between text-base font-semibold">
          <span>Total</span>
          <span>€{total}</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={!cart.length}
          className="mt-2 w-full rounded-2xl bg-black px-4 py-4 text-center text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow disabled:translate-y-0 disabled:bg-[#c8bfb3]"
        >
          Proceed to checkout
        </button>
      </div>
    </section>
  );
}

function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
}) {
  const touchStart = useRef<number | null>(null);

  return (
    <div
      className="relative flex gap-3 overflow-hidden rounded-3xl bg-white p-3 ring-1 ring-[var(--outline)]"
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStart.current;
        if (delta < -60) {
          onRemove();
        }
        touchStart.current = null;
      }}
    >
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-[var(--background)]">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold">{item.product.name}</p>
            <p className="text-xs text-[var(--muted)]">
              €{item.product.price} • {item.product.category}
            </p>
          </div>
          <button
            onClick={onRemove}
            className="text-sm font-semibold text-[var(--muted)]"
          >
            Remove
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-[var(--background)] px-3 py-1.5">
            <button
              className="h-7 w-7 rounded-full bg-white text-lg ring-1 ring-[var(--outline)]"
              onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
            >
              –
            </button>
            <span className="min-w-[20px] text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <button
              className="h-7 w-7 rounded-full bg-white text-lg ring-1 ring-[var(--outline)]"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              +
            </button>
          </div>
          <span className="text-sm font-semibold">
            €{item.product.price * item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
}

function CheckoutScreen({
  checkoutStep,
  form,
  errors,
  onBack,
  onNext,
  onSubmit,
  onChange,
  onSwipeStart,
  onSwipeEnd,
}: {
  checkoutStep: number;
  form: {
    user: { name: string; email: string; phone: string };
    address: { line: string; city: string; state: string; pincode: string };
    paymentMethod: string;
  };
  errors: Record<string, string>;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onChange: (f: typeof form) => void;
  onSwipeStart: (x: number) => void;
  onSwipeEnd: (x: number) => void;
}) {
  return (
    <section
      className="rounded-[32px] bg-[var(--card)] p-5 shadow-sm ring-1 ring-[var(--outline)]"
      onTouchStart={(e) => onSwipeStart(e.touches[0].clientX)}
      onTouchEnd={(e) => onSwipeEnd(e.changedTouches[0].clientX)}
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-[var(--outline)]"
          aria-label="Back"
        >
          ←
        </button>
        <StepIndicator step={checkoutStep} />
      </div>

      {checkoutStep === 1 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold leading-6">User details</h2>
          <p className="text-sm text-[var(--muted)]">
            We validate each field before continuing.
          </p>
          <InputField
            label="Full name"
            value={form.user.name}
            onChange={(value) =>
              onChange({ ...form, user: { ...form.user, name: value } })
            }
            error={errors.name}
            placeholder="Alex Johnson"
          />
          <InputField
            label="Email"
            value={form.user.email}
            onChange={(value) =>
              onChange({ ...form, user: { ...form.user, email: value } })
            }
            error={errors.email}
            placeholder="you@example.com"
            type="email"
          />
          <InputField
            label="Phone"
            value={form.user.phone}
            onChange={(value) =>
              onChange({ ...form, user: { ...form.user, phone: value } })
            }
            error={errors.phone}
            placeholder="10-digit number"
            inputMode="numeric"
          />
        </div>
      )}

      {checkoutStep === 2 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold leading-6">Shipping address</h2>
          <p className="text-sm text-[var(--muted)]">
            Fields keep their values even if you go back.
          </p>
          <InputField
            label="Address line"
            value={form.address.line}
            onChange={(value) =>
              onChange({ ...form, address: { ...form.address, line: value } })
            }
            error={errors.line}
            placeholder="Apartment, street"
          />
          <InputField
            label="City"
            value={form.address.city}
            onChange={(value) =>
              onChange({ ...form, address: { ...form.address, city: value } })
            }
            error={errors.city}
            placeholder="Paris"
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField
              label="State"
              value={form.address.state}
              onChange={(value) =>
                onChange({ ...form, address: { ...form.address, state: value } })
              }
              error={errors.state}
              placeholder="Île-de-France"
            />
            <InputField
              label="Pincode"
              value={form.address.pincode}
              onChange={(value) =>
                onChange({
                  ...form,
                  address: { ...form.address, pincode: value },
                })
              }
              error={errors.pincode}
              placeholder="75001"
              inputMode="numeric"
            />
          </div>
        </div>
      )}

      {checkoutStep === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold leading-6">Payment</h2>
          <p className="text-sm text-[var(--muted)]">
            Mock payment—no real gateway.
          </p>
          <div className="flex flex-col gap-2">
            {paymentMethods.map((method) => (
              <label
                key={method}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  form.paymentMethod === method
                    ? "border-black bg-white shadow-sm"
                    : "border-[var(--outline)] bg-white"
                }`}
              >
                <span>{method}</span>
                <input
                  type="radio"
                  name="payment"
                  checked={form.paymentMethod === method}
                  onChange={() => onChange({ ...form, paymentMethod: method })}
                  className="h-4 w-4 accent-black"
                />
              </label>
            ))}
            {errors.payment && (
              <p className="text-sm text-red-600">{errors.payment}</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {checkoutStep > 1 && (
          <button
            onClick={onBack}
            className="flex-1 rounded-2xl bg-white px-4 py-4 text-center font-semibold ring-1 ring-[var(--outline)]"
          >
            Back
          </button>
        )}
        {checkoutStep < 3 && (
          <button
            onClick={onNext}
            className="flex-1 rounded-2xl bg-black px-4 py-4 text-center font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow"
          >
            Next step
          </button>
        )}
        {checkoutStep === 3 && (
          <button
            onClick={onSubmit}
            className="flex-1 rounded-2xl bg-black px-4 py-4 text-center font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow"
          >
            Place order
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-[var(--muted)]">
        You can also swipe left/right to move between steps.
      </p>
    </section>
  );
}

function ConfirmationScreen({
  orderId,
  items,
  total,
  onContinue,
}: {
  orderId: string | null;
  items: CartItem[];
  total: number;
  onContinue: () => void;
}) {
  return (
    <section className="rounded-[32px] bg-[var(--card)] p-5 text-center shadow-sm ring-1 ring-[var(--outline)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e4dccf] text-2xl">
        ✅
      </div>
      <h2 className="mt-3 text-2xl font-semibold">Order placed</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {orderId ? `Order ${orderId} is confirmed.` : "Your order is confirmed."}
        {"  "}A calm confirmation for a calm checkout.
      </p>

      <div className="mt-4 space-y-2 rounded-3xl bg-white p-4 text-left ring-1 ring-[var(--outline)]">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between text-sm"
          >
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span className="font-semibold">
              €{item.product.price * item.quantity}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-2 text-base font-semibold">
          <span>Total</span>
          <span>€{total}</span>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="mt-5 w-full rounded-2xl bg-black px-4 py-4 text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow"
      >
        Continue shopping
      </button>
    </section>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 ring-1 ring-[var(--outline)]">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
            step === index
              ? "bg-black text-white"
              : "bg-[var(--background)] text-[var(--muted)]"
          }`}
        >
          {index}
        </div>
      ))}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">{label}</label>
      <input
        value={value}
        type={type}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-[var(--outline)] placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[#d3c6b5] ${
          error ? "ring-red-400" : ""
        }`}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
