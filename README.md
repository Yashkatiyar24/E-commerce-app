# Shopease - Mini E-Commerce Mobile App

A fully functional e-commerce mobile app built with React Native (Expo) featuring product browsing, cart management, and a complete checkout flow.

## 📱 Screenshots

The app includes 5 main screens:
- **Home** - Product listing with grid layout
- **Product Detail** - Image gallery, sizes, quantity selector
- **Cart** - Item management with swipe-to-delete
- **Checkout** - 3-step form with validation
- **Confirmation** - Order summary

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/E-commerce-app-master.git

# Navigate to project directory
cd E-commerce-app-master

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running the App

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web

# Or scan QR code with Expo Go app
npx expo start
```

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo SDK 54** | Development toolchain & build system |
| **TypeScript** | Type-safe JavaScript |
| **React Navigation** | Screen navigation (Native Stack) |
| **React Native Gesture Handler** | Swipe gestures |
| **AsyncStorage** | Local data persistence |
| **React Context API** | Global state management |

## 📦 State Management Approach

### Cart State (React Context + AsyncStorage)

The app uses **React Context API** for global state management with the following features:

```typescript
// CartContext provides:
- items: CartItem[]           // Current cart items
- addToCart()                 // Add product with quantity
- updateQuantity()            // Modify item quantity
- removeFromCart()            // Remove item
- clearCart()                 // Empty cart
- cartCount                   // Total item count
- cartTotal                   // Total price
- lastOrder                   // Order summary after checkout
```

**Persistence**: Cart state is automatically synced to `AsyncStorage`, so cart items persist across app restarts.

### Form State (Local Component State)

Checkout form uses `useState` with a structured object:
```typescript
{
  user: { name, email, phone },
  address: { line, city, state, pincode },
  paymentMethod: string,
  card: { cardNumber, expiry, cvv, name, billingAddress }
}
```

## ✨ Features Implemented

### Screen 1: Product Listing
- ✅ Grid layout with 6 products
- ✅ Product image, name, price display
- ✅ **"+ ADD" button** for quick add to cart
- ✅ Cart icon with live item count badge
- ✅ **Swipe right** on product → Quick add to cart
- ✅ **Tap** on product → Open detail screen
- ✅ Visual highlight feedback when item added

### Screen 2: Product Detail
- ✅ Image gallery with thumbnail selector
- ✅ Product name, price, description
- ✅ Size selection pills
- ✅ Quantity selector (+/–)
- ✅ Add to cart button with dynamic price
- ✅ Back navigation

### Screen 3: Cart
- ✅ List of cart items with images
- ✅ Quantity increase/decrease per item
- ✅ Item subtotal display
- ✅ Cart total with shipping info
- ✅ "Proceed to Checkout" button
- ✅ **Swipe left** on item → Remove from cart
- ✅ Empty cart state with message
- ✅ Disabled checkout when cart empty

### Screen 4: Checkout (Multi-Step Form)
- ✅ **Step 1**: User details (name, email, phone)
- ✅ **Step 2**: Shipping address (line, city, state, pincode)
- ✅ **Step 3**: Payment method selection (UPI, Card, COD)
- ✅ Field validation with error messages
- ✅ Cannot proceed without valid inputs
- ✅ Data retained when navigating back
- ✅ Step indicator UI
- ✅ Card validation (Visa/Mastercard detection)

### Screen 5: Order Confirmation
- ✅ Success message with order ID
- ✅ Order summary (items, quantities, prices)
- ✅ Shipping address display
- ✅ Total amount
- ✅ "Continue Shopping" button

## 🎯 Gestures Implemented

| Gesture | Screen | Action |
|---------|--------|--------|
| Swipe Right | Product Listing | Quick add to cart |
| Swipe Left | Cart | Remove item |
| Tap | Product Listing | Open detail |
| Scroll | All screens | Navigate content |

## 🎁 Bonus Features

- ✅ **Local Storage Persistence** - Cart survives app restart (AsyncStorage)
- ✅ **Animations** - Highlight effect on add, smooth swipe animations
- ✅ **Reusable Components** - ProductTile, CartItemRow, InputField, StepIndicator
- ✅ **Responsive UI** - Adapts to screen dimensions via `useWindowDimensions`
- ✅ **Safe Area Handling** - Proper notch/status bar support

## 📝 Assumptions & Trade-offs

1. **No Backend**: All data is static/dummy as per requirements
2. **Mock Payment**: Payment flow is simulated, no actual processing
3. **Single Size Selection**: Size pills are displayed but not tracked in cart (simplification)
4. **Currency**: Euro (€) used for all prices
5. **Image Sources**: Using external URLs for product images
6. **Validation**: Basic regex validation for email, phone, pincode

## 📁 Project Structure

```
src/
├── context/
│   └── CartContext.tsx      # Global cart state + persistence
├── data/
│   └── products.ts          # Static product data
├── navigation/
│   └── types.ts             # Navigation type definitions
├── screens/
│   ├── HomeScreen.tsx       # Product listing
│   ├── ProductDetailScreen.tsx
│   ├── CartScreen.tsx
│   ├── CheckoutScreen.tsx   # Multi-step form
│   └── ConfirmationScreen.tsx
├── theme.ts                 # Colors, spacing, typography
└── types.ts                 # TypeScript interfaces
```

## 🧪 Testing the App

1. **Add to Cart**: Tap "+ ADD" button or swipe right on any product
2. **View Detail**: Tap on product image
3. **Modify Quantity**: Use +/– in detail or cart screen
4. **Remove Item**: Swipe left on cart item
5. **Checkout**: Fill all 3 steps with valid data
6. **Place Order**: Complete mock payment

## 📄 License

MIT License - Feel free to use for learning purposes.
