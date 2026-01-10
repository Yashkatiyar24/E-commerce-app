import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useCart } from "../context/CartContext";
import { palette } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "Confirmation">;

export default function ConfirmationScreen({ navigation, route }: Props) {
  const { lastOrder, resetOrder } = useCart();
  const insets = useSafeAreaInsets();
  const orderId = route.params?.orderId ?? lastOrder?.id ?? "SO-000000";
  const order = lastOrder;

  return (
    <View style={[styles.safe, { paddingTop: insets.top || 0 }]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: (insets.bottom || 12) + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconWrap}>
        <Text style={styles.icon}>✅</Text>
      </View>
      <Text style={styles.title}>Order placed</Text>
      <Text style={styles.caption}>
        {orderId ? `Order ${orderId} is confirmed.` : "Your order is confirmed."}{" "}
        A calm confirmation for a calm checkout.
      </Text>

      {order ? (
        <View style={styles.summary}>
          {order.items.map((item) => (
            <View key={item.product.id} style={styles.summaryRow}>
              <Text style={styles.summaryText}>
                {item.product.name} × {item.quantity}
              </Text>
              {item.product.price > 0 ? (
                <Text style={styles.summaryValue}>
                  €{item.product.price * item.quantity}
                </Text>
              ) : null}
            </View>
          ))}
          {order.address && (
            <View style={styles.addressBlock}>
              <Text style={styles.addressLabel}>Shipping address</Text>
              <Text style={styles.addressText}>{order.address.line}</Text>
              <Text style={styles.addressText}>
                {order.address.city}, {order.address.state} {order.address.pincode}
              </Text>
            </View>
          )}
          {order.total > 0 ? (
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>€{order.total}</Text>
            </View>
          ) : null}
        </View>
      ) : (
        <View style={styles.summary}>
          <Text style={styles.summaryText}>No order details available.</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          resetOrder();
          navigation.popToTop();
        }}
      >
        <Text style={styles.buttonText}>Continue shopping</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  container: {
    padding: 12,
    gap: 10,
    alignItems: "center",
  },
  iconWrap: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e4dccf",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 30 },
  title: { fontSize: 24, fontWeight: "700" },
  caption: { fontSize: 14, color: palette.muted, textAlign: "center" },
  summary: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.outline,
    gap: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryText: { fontSize: 14 },
  summaryValue: { fontSize: 14, fontWeight: "700" },
  addressBlock: {
    borderTopWidth: 1,
    borderTopColor: palette.outline,
    paddingTop: 8,
    gap: 2,
  },
  addressLabel: { fontSize: 13, fontWeight: "700" },
  addressText: { fontSize: 13, color: palette.muted },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: palette.outline,
    paddingTop: 8,
  },
  totalText: { fontSize: 16, fontWeight: "700" },
  button: {
    alignSelf: "stretch",
    backgroundColor: "#000",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
