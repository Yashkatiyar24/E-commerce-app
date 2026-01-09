"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CreditCard, MapPin, User, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Header } from "@/components/Header";

const STEPS = [
  { id: 1, title: "Details", icon: User },
  { id: 2, title: "Shipping", icon: MapPin },
  { id: 3, title: "Payment", icon: CreditCard },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
      if (!formData.phone) newErrors.phone = "Phone is required";
    } else if (step === 2) {
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.pincode) newErrors.pincode = "Pincode is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 3) setStep(step + 1);
      else handlePlaceOrder();
    }
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    clearCart();
    router.push("/order-confirmation");
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      
      <main className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-10 px-2">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  step >= s.id ? "bg-black text-white" : "bg-zinc-100 text-zinc-400"
                }`}>
                  <s.icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  step >= s.id ? "text-black" : "text-zinc-400"
                }`}>
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-[2px] mb-6 mx-2 ${
                  step > s.id ? "bg-black" : "bg-zinc-100"
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-zinc-900">Personal Details</h2>
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  error={errors.name}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  error={errors.email}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 234 567 890"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  error={errors.phone}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-zinc-900">Shipping Address</h2>
                <Input
                  label="Street Address"
                  placeholder="123 Minimal St."
                  value={formData.address}
                  onChange={(e) => updateFormData("address", e.target.value)}
                  error={errors.address}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    error={errors.city}
                  />
                  <Input
                    label="State"
                    placeholder="NY"
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                    error={errors.state}
                  />
                </div>
                <Input
                  label="Pincode"
                  placeholder="10001"
                  value={formData.pincode}
                  onChange={(e) => updateFormData("pincode", e.target.value)}
                  error={errors.pincode}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-zinc-900">Payment Method</h2>
                <div className="space-y-3">
                  {["Credit Card", "PayPal", "Apple Pay"].map((method) => (
                    <button
                      key={method}
                      onClick={() => updateFormData("paymentMethod", method.toLowerCase())}
                      className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                        formData.paymentMethod === method.toLowerCase()
                          ? "border-black bg-zinc-50"
                          : "border-zinc-100 hover:border-zinc-200"
                      }`}
                    >
                      <span className="font-semibold text-zinc-900">{method}</span>
                      {formData.paymentMethod === method.toLowerCase() && (
                        <CheckCircle2 className="w-5 h-5 text-black" />
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="p-4 bg-zinc-50 rounded-2xl space-y-2">
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Order Total</span>
                    <span className="font-bold text-zinc-900">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="p-6 border-t border-zinc-100 flex gap-4">
        {step > 1 && (
          <Button
            variant="outline"
            className="flex-1 h-14 rounded-2xl"
            onClick={() => setStep(step - 1)}
          >
            Back
          </Button>
        )}
        <Button
          className="flex-[2] h-14 rounded-2xl gap-2 shadow-xl shadow-black/10"
          onClick={handleNext}
        >
          {step === 3 ? "Place Order" : "Continue"}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
