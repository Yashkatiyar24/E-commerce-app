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

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route, navigation }: Props) {
  const product = useMemo(
    () => getProductById(route.params.productId),
    [route.params.productId],
  );
  const { addToCart } = useCart();
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
    <ScrollView
      style={styles.safe}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.swipeHint}>Swipe right to close</Text>
      </View>

      <View style={styles.imageCard}>
        <View style={styles.heroImageWrapper}>
          <Image source={{ uri: selectedImage }} style={styles.heroImage} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbRow}
        >
          {product.gallery.map((img) => (
            <TouchableOpacity
              key={img}
              style={[
                styles.thumbButton,
                selectedImage === img && styles.thumbButtonActive,
              ]}
              onPress={() => setSelectedImage(img)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: img }} style={styles.thumbImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.productHeader}>
          <View>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.category}>{product.category}</Text>
          </View>
          <Text style={styles.price}>€{product.price}</Text>
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
        <View style={styles.priceBadge}>
          <Text style={styles.priceBadgeText}>€{product.price * quantity}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  swipeHint: {
    fontSize: 13,
    color: palette.muted,
    fontWeight: "600",
  },
  imageCard: {
    backgroundColor: palette.card,
    borderRadius: 32,
    padding: 12,
    borderWidth: 1,
    borderColor: palette.outline,
  },
  heroImageWrapper: {
    borderRadius: 24,
    overflow: "hidden",
    height: 280,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  thumbRow: {
    gap: 10,
    paddingTop: 12,
  },
  thumbButton: {
    width: 70,
    height: 70,
    borderRadius: 16,
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
    fontSize: 20,
    fontWeight: "700",
  },
  category: {
    fontSize: 13,
    color: palette.muted,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.outline,
  },
  sectionLabel: {
    fontSize: 13,
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
    paddingHorizontal: 14,
    paddingVertical: 12,
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
    width: 36,
    height: 36,
    borderRadius: 18,
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
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
  },
  priceBadgeText: {
    fontWeight: "700",
  },
  error: {
    padding: 20,
    fontSize: 16,
  },
});
