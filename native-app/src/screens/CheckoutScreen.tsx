import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { palette } from "../theme";
import { useCart } from "../context/CartContext";
import { paymentMethods } from "../data/products";

type Props = NativeStackScreenProps<RootStackParamList, "Checkout">;

export default function CheckoutScreen({ navigation }: Props) {
  const { items, cartTotal, clearCart, recordOrder, lastOrder } = useCart();
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    user: { name: "", email: "", phone: "" },
    address: { line: "", city: "", state: "", pincode: "" },
    paymentMethod: "UPI",
  });

  useEffect(() => {
    if (!items.length && !lastOrder) navigation.replace("Home");
  }, [items.length, lastOrder, navigation]);

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
    if (step === 3 && !form.paymentMethod) {
      stepErrors.payment = "Select a method";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleStep = (direction: "next" | "back") => {
    if (direction === "back") {
      setCheckoutStep((step) => Math.max(1, step - 1));
      return;
    }
    if (validateStep(checkoutStep)) {
      setCheckoutStep((step) => Math.min(3, step + 1));
    }
  };

  const handleSubmit = () => {
    if (!validateStep(3)) return;
    const orderId = `SO-${Date.now().toString().slice(-6)}`;
    recordOrder({ id: orderId, items, total: cartTotal });
    clearCart();
    navigation.replace("Confirmation", { orderId });
  };

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => handleStep("back")}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <StepIndicator step={checkoutStep} />
        </View>

        {checkoutStep === 1 && (
          <View style={styles.section}>
            <Text style={styles.heading}>User details</Text>
            <Text style={styles.caption}>
              We validate each field before continuing.
            </Text>
            <InputField
              label="Full name"
              value={form.user.name}
              onChange={(value) =>
                setForm({ ...form, user: { ...form.user, name: value } })
              }
              placeholder="Alex Johnson"
              error={errors.name}
            />
            <InputField
              label="Email"
              value={form.user.email}
              onChange={(value) =>
                setForm({ ...form, user: { ...form.user, email: value } })
              }
              placeholder="you@example.com"
              error={errors.email}
              keyboardType="email-address"
            />
            <InputField
              label="Phone"
              value={form.user.phone}
              onChange={(value) =>
                setForm({ ...form, user: { ...form.user, phone: value } })
              }
              placeholder="10-digit number"
              error={errors.phone}
              keyboardType="number-pad"
            />
          </View>
        )}

        {checkoutStep === 2 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Shipping address</Text>
            <Text style={styles.caption}>
              Fields keep their values even if you go back.
            </Text>
            <InputField
              label="Address line"
              value={form.address.line}
              onChange={(value) =>
                setForm({ ...form, address: { ...form.address, line: value } })
              }
              placeholder="Apartment, street"
              error={errors.line}
            />
            <InputField
              label="City"
              value={form.address.city}
              onChange={(value) =>
                setForm({ ...form, address: { ...form.address, city: value } })
              }
              placeholder="Paris"
              error={errors.city}
            />
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <InputField
                  label="State"
                  value={form.address.state}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      address: { ...form.address, state: value },
                    })
                  }
                  placeholder="Île-de-France"
                  error={errors.state}
                />
              </View>
              <View style={{ flex: 1 }}>
                <InputField
                  label="Pincode"
                  value={form.address.pincode}
                  onChange={(value) =>
                    setForm({
                      ...form,
                      address: { ...form.address, pincode: value },
                    })
                  }
                  placeholder="75001"
                  error={errors.pincode}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>
        )}

        {checkoutStep === 3 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Payment</Text>
            <Text style={styles.caption}>Mock payment—no real gateway.</Text>
            <View style={{ gap: 10 }}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.paymentCard,
                    form.paymentMethod === method && styles.paymentCardActive,
                  ]}
                  onPress={() => setForm({ ...form, paymentMethod: method })}
                >
                  <Text
                    style={[
                      styles.paymentText,
                      form.paymentMethod === method && styles.paymentTextActive,
                    ]}
                  >
                    {method}
                  </Text>
                  <View
                    style={[
                      styles.radio,
                      form.paymentMethod === method && styles.radioActive,
                    ]}
                  />
                </TouchableOpacity>
              ))}
              {errors.payment && (
                <Text style={styles.errorText}>{errors.payment}</Text>
              )}
            </View>
          </View>
        )}

        <View style={styles.actions}>
          {checkoutStep > 1 && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => handleStep("back")}
            >
              <Text style={styles.secondaryText}>Back</Text>
            </TouchableOpacity>
          )}
          {checkoutStep < 3 && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => handleStep("next")}
            >
              <Text style={styles.primaryText}>Next step</Text>
            </TouchableOpacity>
          )}
          {checkoutStep === 3 && (
            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
              <Text style={styles.primaryText}>Place order</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.footerNote}>
          Swipe left/right to move between steps is emulated here with buttons.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <View style={styles.stepper}>
      {[1, 2, 3].map((index) => (
        <View
          key={index}
          style={[styles.stepCircle, step === index && styles.stepCircleActive]}
        >
          <Text
            style={[
              styles.stepText,
              step === index && styles.stepTextActive,
            ]}
          >
            {index}
          </Text>
        </View>
      ))}
    </View>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  error,
  keyboardType,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
}) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={palette.muted}
        keyboardType={keyboardType}
        style={[
          styles.input,
          error ? styles.inputError : undefined,
        ]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: palette.outline,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { fontSize: 18 },
  section: {
    backgroundColor: palette.card,
    borderRadius: 28,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.outline,
    gap: 12,
  },
  heading: { fontSize: 20, fontWeight: "700" },
  caption: { fontSize: 13, color: palette.muted },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.outline,
    backgroundColor: "#fff",
    padding: 14,
  },
  paymentCardActive: {
    borderColor: "#000",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  paymentText: { fontSize: 14, fontWeight: "600", color: palette.foreground },
  paymentTextActive: { color: "#000" },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: palette.outline,
  },
  radioActive: {
    borderColor: "#000",
    backgroundColor: "#000",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.outline,
    alignItems: "center",
    paddingVertical: 14,
  },
  secondaryText: { fontWeight: "700" },
  primaryButton: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 14,
  },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  footerNote: {
    fontSize: 12,
    color: palette.muted,
    textAlign: "center",
  },
  inputLabel: {
    fontWeight: "700",
    fontSize: 13,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.outline,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: palette.outline,
  },
  stepCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: palette.background,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleActive: {
    backgroundColor: "#000",
  },
  stepText: { color: palette.muted, fontWeight: "700" },
  stepTextActive: { color: "#fff" },
});
