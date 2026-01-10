import React, { useMemo, useState } from "react";
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
import { getProductById } from "../data/products";
import { palette } from "../theme";
import { useCart } from "../context/CartContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route, navigation }: Props) {
  const product = useMemo(
    () => getProductById(route.params.productId),
    [route.params.productId],
  );
  const { addToCart } = useCart();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [selectedImage, setSelectedImage] = useState(
    product?.gallery[0] ?? product?.image ?? "",
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <View style={styles.safe}>
        <Text style={styles.error}>Product not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: (insets.bottom || 8) + 12 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: insets.top || 0 }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </View>

      <View style={styles.imageCard}>
        <View
          style={[
            styles.heroImageWrapper,
            { height: Math.min(width * 1.1, height * 0.55) },
          ]}
        >
          <Image source={{ uri: selectedImage }} style={styles.heroImage} />
        </View>
        </View>

      <View style={styles.section}>
        <View style={styles.productHeader}>
          <View>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.category}>{product.category}</Text>
          </View>
          {product.price > 0 ? (
            <Text style={styles.price}>₹{product.price}</Text>
          ) : null}
        </View>
        <Text style={styles.sectionLabel}>Select size</Text>
        <View style={styles.sizeRow}>
          {product.sizes.map((size) => (
            <View key={size} style={styles.sizePill}>
              <Text style={styles.sizeText}>{size}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      <View style={styles.quantityRow}>
        <Text style={styles.quantityLabel}>Quantity</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            <Text style={styles.quantityButtonText}>–</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity((q) => q + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          addToCart(product, quantity);
          navigation.navigate("Cart");
        }}
      >
        <Text style={styles.addButtonText}>Add to cart</Text>
        {product.price > 0 ? (
          <View style={styles.priceBadge}>
            <Text style={styles.priceBadgeText}>₹{product.price * quantity}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.outline,
  },
  backIcon: {
    fontSize: 18,
  },
  imageCard: {
    backgroundColor: palette.card,
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderWidth: 0,
    marginHorizontal: 0,
  },
  heroImageWrapper: {
    borderRadius: 0,
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  thumbRow: {
    gap: 8,
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  thumbButton: {
    width: 64,
    height: 64,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: palette.outline,
  },
  thumbButtonActive: {
    borderColor: "#000",
    borderWidth: 2,
  },
  thumbImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  section: {
    backgroundColor: palette.card,
    borderRadius: 28,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.outline,
    gap: 10,
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Helvetica",
  },
  category: {
    fontSize: 12,
    color: palette.muted,
    fontFamily: "Helvetica",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.outline,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: palette.muted,
  },
  sizeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  sizePill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: palette.outline,
  },
  sizeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  description: {
    fontSize: 14,
    color: palette.muted,
    lineHeight: 20,
  },
  quantityRow: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.outline,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityLabel: {
    fontWeight: "600",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: palette.outline,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  quantityValue: {
    minWidth: 28,
    textAlign: "center",
    fontWeight: "700",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  priceBadge: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "center",
    minWidth: 60,
    alignItems: "center",
  },
  priceBadgeText: {
    fontWeight: "700",
    textAlign: "center",
  },
  error: {
    padding: 20,
    fontSize: 16,
  },
});
