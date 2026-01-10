import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { palette } from "../theme";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Swipeable } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;

export default function CartScreen({ navigation }: Props) {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safe, { paddingTop: insets.top || 0 }]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: (insets.bottom || 12) + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.navRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.cartBlob}>
            <Text style={styles.cartBlobIcon}>🛒</Text>
          </View>
        </View>

        <View style={styles.brandBar}>
          <Text style={styles.brandText}>Shopease</Text>
        </View>

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Your cart</Text>
            <Text style={styles.caption}>Swipe left on an item to remove</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{items.length} items</Text>
          </View>
        </View>

      {items.length === 0 && (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Your cart is quiet</Text>
          <Text style={styles.caption}>
            Add a piece to feel the badge update instantly.
          </Text>
        </View>
      )}

      <View style={styles.list}>
        {items.map((item) => (
          <CartItemRow
            key={item.product.id}
            item={item}
            onRemove={() => removeFromCart(item.product.id)}
            onUpdate={(qty) => updateQuantity(item.product.id, qty)}
          />
        ))}
      </View>

      <View style={styles.summary}>
        {cartTotal > 0 ? (
          <>
            <View style={styles.row}>
              <Text style={styles.caption}>Subtotal</Text>
              <Text style={styles.value}>€{cartTotal}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.caption}>Shipping</Text>
              <Text style={styles.value}>Included</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalLabel}>€{cartTotal}</Text>
            </View>
          </>
        ) : null}
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            !items.length && styles.checkoutButtonDisabled,
          ]}
          disabled={!items.length}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.checkoutText}>Proceed to checkout</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}

function CartItemRow({
  item,
  onRemove,
  onUpdate,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdate: (qty: number) => void;
}) {
  let swipeableRef: Swipeable | null = null;

  return (
    <Swipeable
      ref={(ref) => {
        swipeableRef = ref;
      }}
      renderRightActions={() => (
        <View style={styles.swipeRemove}>
          <Text style={styles.swipeRemoveText}>Remove</Text>
        </View>
      )}
      onSwipeableOpen={(direction) => {
        if (direction === "right") {
          onRemove();
          swipeableRef?.close();
        }
      }}
      overshootFriction={8}
    >
      <View style={styles.itemCard}>
        <View style={styles.itemImageWrapper}>
          <Image source={{ uri: item.product.image }} style={styles.itemImage} />
        </View>
        <View style={styles.itemMeta}>
          <View style={styles.itemHeader}>
            <View>
              <Text style={styles.itemName}>{item.product.name}</Text>
              <Text style={styles.itemCaption}>
                {item.product.price > 0 ? `€${item.product.price} • ` : ""}
                {item.product.category}
              </Text>
            </View>
            <TouchableOpacity onPress={onRemove}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemFooter}>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => {
                    const next = item.quantity - 1;
                    if (next <= 0) onRemove();
                    else onUpdate(next);
                  }}
                >
                  <Text style={styles.quantityText}>–</Text>
                </TouchableOpacity>
              <Text style={styles.quantityValue}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => onUpdate(item.quantity + 1)}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
            {item.product.price > 0 ? (
              <Text style={styles.itemTotal}>
                €{item.product.price * item.quantity}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    padding: 12,
    gap: 12,
    paddingBottom: 24,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  cartBlob: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: palette.outline,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBlobIcon: {
    fontSize: 18,
  },
  brandBar: {
    alignItems: "center",
    marginBottom: 8,
  },
  brandText: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  title: { fontSize: 20, fontWeight: "700" },
  caption: { fontSize: 13, color: palette.muted },
  badge: {
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: palette.outline,
  },
  badgeText: { fontWeight: "700" },
  empty: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: palette.outline,
  },
  emptyTitle: { fontSize: 16, fontWeight: "700" },
  list: {
    gap: 12,
  },
  itemCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: palette.outline,
  },
  itemImageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: palette.background,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  itemMeta: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  itemName: { fontSize: 14, fontWeight: "700", fontFamily: "Helvetica" },
  itemCaption: { fontSize: 12, color: palette.muted, fontFamily: "Helvetica" },
  removeText: { fontSize: 13, fontWeight: "600", color: palette.muted },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: palette.background,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.outline,
  },
  quantityText: { fontSize: 16, fontWeight: "600" },
  quantityValue: { fontWeight: "700", minWidth: 22, textAlign: "center" },
  itemTotal: { fontSize: 14, fontWeight: "700" },
  summary: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.outline,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  value: { fontWeight: "700", color: palette.foreground },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  totalLabel: { fontWeight: "700", fontSize: 16 },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: "#000",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
  },
  checkoutButtonDisabled: {
    backgroundColor: "#c8bfb3",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  swipeRemove: {
    backgroundColor: "#e63946",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    borderRadius: 18,
    marginVertical: 4,
  },
  swipeRemoveText: {
    color: "#fff",
    fontWeight: "700",
  },
});
