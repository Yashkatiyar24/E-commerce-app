import React, { useMemo, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { products, categories } from "../data/products";
import { palette } from "../theme";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { addToCart, items, cartCount } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("Trending");
  const [searchTerm, setSearchTerm] = useState("");
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);

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

  const quantityInCart = (productId: string) =>
    items.find((item) => item.product.id === productId)?.quantity ?? 0;

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    setRecentlyAdded(product.id);
    setTimeout(() => setRecentlyAdded(null), 900);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.logoLabel}>Shopease</Text>
            <Text style={styles.title}>Calm curated picks</Text>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate("Cart")}
            accessibilityLabel="Open cart"
          >
            <Text style={styles.cartIcon}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              value={searchTerm}
              placeholder="Search minimal staples"
              placeholderTextColor={palette.muted}
              onChangeText={setSearchTerm}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                style={[
                  styles.categoryPill,
                  activeCategory === category && styles.categoryPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={() => handleAdd(product)}
                onOpen={() =>
                  navigation.navigate("ProductDetail", {
                    productId: product.id,
                  })
                }
                quantity={quantityInCart(product.id)}
                highlight={recentlyAdded === product.id}
              />
            ))}
          </View>
          <Text style={styles.helperText}>
            Tap a card for details. Add to cart updates the badge instantly.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProductCard({
  product,
  onAdd,
  onOpen,
  quantity,
  highlight,
}: {
  product: Product;
  onAdd: () => void;
  onOpen: () => void;
  quantity: number;
  highlight: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.productCard, highlight && styles.productCardHighlight]}
      onPress={onOpen}
      activeOpacity={0.9}
    >
      <View style={styles.productImageWrapper}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
      </View>
      <View style={styles.productMeta}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.productFooter}>
          <Text style={styles.price}>€{product.price}</Text>
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addButtonText}>
              {quantity > 0 ? `In cart • ${quantity}` : "Add to cart"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },
  header: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.card,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: palette.outline,
  },
  logoLabel: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: palette.muted,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.outline,
  },
  cartIcon: {
    fontSize: 18,
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#000",
    borderRadius: 10,
    minWidth: 20,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "700",
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.outline,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.outline,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 16,
    color: palette.muted,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: palette.foreground,
  },
  categoryRow: {
    paddingVertical: 12,
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: palette.outline,
  },
  categoryPillActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: palette.foreground,
  },
  categoryTextActive: {
    color: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 10,
    borderWidth: 1,
    borderColor: palette.outline,
  },
  productCardHighlight: {
    borderColor: "#cdb9a3",
    borderWidth: 2,
  },
  productImageWrapper: {
    borderRadius: 18,
    overflow: "hidden",
    height: 140,
    backgroundColor: palette.background,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productMeta: {
    marginTop: 10,
    gap: 6,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
  },
  productFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  helperText: {
    marginTop: 12,
    fontSize: 12,
    color: palette.muted,
  },
});
