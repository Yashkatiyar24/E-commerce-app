import React, { useState } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { products } from "../data/products";
import { palette } from "../theme";
import { useCart } from "../context/CartContext";
import { Product } from "../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { addToCart, items, cartCount } = useCart();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const horizontalPadding = 0;
  const gap = 0;
  const tileWidth = (width - horizontalPadding * 2 - gap) / 2;

  const quantityInCart = (productId: string) =>
    items.find((item) => item.product.id === productId)?.quantity ?? 0;

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    setRecentlyAdded(product.id);
    setTimeout(() => setRecentlyAdded(null), 900);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.background} />
      
      {/* Compact Header */}
      <View style={[styles.header, { paddingTop: insets.top || 0 }]}>
        <View>
          <Text style={styles.logoLabel}>Shopease</Text>
        </View>
        <View style={styles.headerRight}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={palette.muted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Cart Button */}
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
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProductTile
            product={item}
            width={tileWidth}
            onOpen={() =>
              navigation.navigate("ProductDetail", { productId: item.id })
            }
            onAdd={() => handleAdd(item)}
            quantity={quantityInCart(item.id)}
            highlight={recentlyAdded === item.id}
          />
        )}
      />
    </View>
  );
}

function ProductTile({
  product,
  onAdd,
  onOpen,
  quantity,
  highlight,
  width,
}: {
  product: Product;
  onAdd: () => void;
  onOpen: () => void;
  quantity: number;
  highlight: boolean;
  width: number;
}) {
  const tileHeight = width * 1.35;
  let swipeableRef: Swipeable | null = null;

  return (
    <View style={{ width, marginBottom: 0 }}>
      <Swipeable
        ref={(ref) => {
          swipeableRef = ref;
        }}
        overshootFriction={8}
        renderLeftActions={() => (
          <View style={styles.swipeAdd}>
            <Text style={styles.swipeAddText}>Add</Text>
          </View>
        )}
        onSwipeableOpen={(direction) => {
          if (direction === "left") {
            onAdd();
            swipeableRef?.close();
          }
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onOpen}
          style={[
            styles.tileImageWrapper,
            { height: tileHeight },
            highlight && styles.productCardHighlight,
          ]}
        >
          <Image
            source={{ uri: product.image }}
            style={styles.tileImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </Swipeable>
      <View style={styles.tileMeta}>
        <View style={styles.tileMetaRow}>
          <Text style={styles.tileCategory}>{product.category.toUpperCase()}</Text>
          <Text style={styles.tilePrice}>₹{product.price}</Text>
        </View>
        <View style={styles.tileActions}>
          <TouchableOpacity onPress={onOpen} activeOpacity={0.8}>
            <Text style={styles.tileExplore}>EXPLORE</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addToCartButton} 
            onPress={onAdd}
            activeOpacity={0.7}
          >
            <Text style={styles.addToCartText}>+ ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 4,
    backgroundColor: palette.background,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: palette.outline,
    width: 160,
  },
  searchIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: palette.foreground,
    padding: 0,
  },
  clearIcon: {
    fontSize: 12,
    color: palette.muted,
    marginLeft: 4,
  },
  logoLabel: {
    fontSize: 16,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: palette.foreground,
    fontWeight: "600",
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.outline,
  },
  cartIcon: {
    fontSize: 16,
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "#000",
    borderRadius: 10,
    minWidth: 18,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: palette.muted,
  },
  listContent: {
    paddingBottom: 0,
  },
  columnWrapper: {
    gap: 0,
  },
  productCardHighlight: {
    borderColor: "#cdb9a3",
    borderWidth: 2,
  },
  tileImageWrapper: {
    overflow: "hidden",
    backgroundColor: "#e9e9e9",
  },
  tileImage: {
    width: "100%",
    height: "100%",
  },
  tileMeta: {
    backgroundColor: palette.card,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 6,
  },
  tileMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tileCategory: {
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.5,
    color: palette.foreground,
  },
  tilePrice: {
    fontSize: 13,
    fontWeight: "700",
    color: palette.foreground,
  },
  tileActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tileExplore: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.3,
    color: palette.muted,
  },
  addToCartButton: {
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  swipeAdd: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    backgroundColor: "#0f0f0f",
  },
  swipeAddText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
