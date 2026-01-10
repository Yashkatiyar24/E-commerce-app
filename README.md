# 🛍️ Shopease - E-Commerce Mobile App

A modern, minimalist e-commerce mobile application built with **React Native** and **Expo**. This app provides a seamless shopping experience with product browsing, cart management, and a multi-step checkout flow.

---

## 📱 Screenshots

<p align="center">
  <img src="./screenshots/home.png" width="250" alt="Home Screen" />
  <img src="./screenshots/cart.png" width="250" alt="Cart Screen" />
  <img src="./screenshots/checkout.png" width="250" alt="Checkout Screen" />
</p>

| Home Screen | Cart | Checkout |
|:-----------:|:----:|:--------:|
| Browse products with search | Manage cart items | Multi-step checkout |

---

## ✨ Features

- 🔍 **Product Search** - Real-time search filtering by name and category
- 🛒 **Shopping Cart** - Add, remove, and update quantities with swipe gestures
- 📦 **Product Details** - Full product view with size selection
- 💳 **Multi-step Checkout** - User details, shipping address, and payment selection
- 💾 **Persistent Cart** - Cart data saved locally using AsyncStorage
- 🎨 **Clean UI** - Modern, minimalist design with smooth animations
- 💰 **INR Currency** - Prices displayed in Indian Rupees (₹)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native 0.81** | Cross-platform mobile framework |
| **Expo SDK 54** | Development toolchain & build system |
| **TypeScript 5.9** | Type-safe development |
| **React Navigation 7** | Native stack navigation |
| **React Context API** | Global state management |
| **AsyncStorage** | Local data persistence |
| **React Native Gesture Handler** | Swipe-to-delete functionality |

---

## 🏗️ State Management Approach

This app uses **React Context API** for global state management:

\`\`\`
src/
├── context/
│   └── CartContext.tsx    # Cart state with AsyncStorage persistence
\`\`\`

### Why Context API?

- ✅ **Lightweight** - No external dependencies needed
- ✅ **Built-in** - Native to React, no learning curve
- ✅ **Sufficient** - Perfect for small-to-medium apps
- ✅ **Persistent** - Combined with AsyncStorage for data persistence across sessions

### Cart State Features:
- Add/remove items from cart
- Update item quantities  
- Calculate subtotals and totals
- Persist cart data between app restarts
- Clear cart after successful checkout

---

## 📂 Project Structure

\`\`\`
E-commerce-app/
├── App.tsx                    # Root component with custom splash screen
├── index.ts                   # Entry point
├── app.json                   # Expo configuration
├── tsconfig.json              # TypeScript configuration
├── src/
│   ├── context/
│   │   └── CartContext.tsx    # Cart state management with persistence
│   ├── data/
│   │   └── products.ts        # Product catalog & categories
│   ├── navigation/
│   │   └── types.ts           # Navigation type definitions
│   ├── screens/
│   │   ├── HomeScreen.tsx     # Product grid with search bar
│   │   ├── ProductDetailScreen.tsx  # Product details & add to cart
│   │   ├── CartScreen.tsx     # Shopping cart management
│   │   ├── CheckoutScreen.tsx # Multi-step checkout form
│   │   └── ConfirmationScreen.tsx   # Order confirmation
│   ├── theme.ts               # Color palette & design tokens
│   └── types.ts               # TypeScript interfaces
├── assets/
│   ├── splash-full.png        # Custom splash screen image
│   ├── icon.png               # App icon
│   └── adaptive-icon.png      # Android adaptive icon
└── screenshots/               # App screenshots for README
\`\`\`

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Expo Go** app on your mobile device ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Yashkatiyar24/E-commerce-app.git
   cd E-commerce-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm start
   \`\`\`

4. **Run on your device**
   - Scan the QR code with **Expo Go** (Android) or Camera app (iOS)
   - Or press \`a\` for Android emulator / \`i\` for iOS simulator

### Available Scripts

| Command | Description |
|---------|-------------|
| \`npm start\` | Start Expo development server |
| \`npm run android\` | Run on Android device/emulator |
| \`npm run ios\` | Run on iOS device/simulator |
| \`npm run web\` | Run in web browser |

---

## 📦 Build APK (Android)

To create a standalone APK file:

\`\`\`bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to your Expo account
eas login

# Configure EAS (first time only)
eas build:configure

# Build APK for Android
eas build -p android --profile preview
\`\`\`

The APK will be available for download from your Expo dashboard once the build completes.

---

## ⚖️ Assumptions & Trade-offs

### Assumptions Made

| Assumption | Reasoning |
|------------|-----------|
| **Static Product Data** | Products are hardcoded for demo; production would use REST API |
| **No User Authentication** | Simplified checkout flow without login requirement |
| **Local Storage Only** | Cart data stored locally, no cloud sync |
| **Single Currency (INR)** | App targets Indian market with Rupee pricing |
| **Internet Required** | Product images loaded from external URLs |

### Trade-offs

| Decision | Pros | Cons |
|----------|------|------|
| **Context API over Redux** | Simpler setup, less boilerplate, built-in to React | Less scalable for very complex state |
| **AsyncStorage over SQLite** | Easy to implement, good for key-value storage | Limited query capabilities |
| **Expo Managed Workflow** | Faster development, OTA updates, easier builds | Limited native module access |
| **External Image URLs** | Smaller app bundle size | Requires internet, slower initial load |
| **No Backend Server** | Simpler architecture, easier to demo | No real order processing or inventory |

### Design Decisions

1. **Custom Splash Screen in React** - Native splash doesn't work in Expo Go, so implemented a React-based splash that shows for 3 seconds
2. **Swipe-to-Delete in Cart** - Intuitive mobile UX pattern for removing items
3. **Multi-step Checkout** - Better UX than single long form, allows validation at each step
4. **Real-time Search** - Filters as user types for immediate feedback

---

## 🔮 Future Improvements

- [ ] Backend API integration (Node.js/Express or Firebase)
- [ ] User authentication & profiles
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Order history & tracking
- [ ] Push notifications for orders
- [ ] Wishlist/favorites feature
- [ ] Product reviews & ratings
- [ ] Multiple currency support
- [ ] Dark mode theme
- [ ] Unit & integration tests

---

## 🐛 Known Issues

- Native splash screen only works in standalone builds (not Expo Go)
- Cart badge count may briefly show stale data on first load

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## ��‍💻 Author

**Yash Katiyar**

[![GitHub](https://img.shields.io/badge/GitHub-@Yashkatiyar24-181717?style=flat&logo=github)](https://github.com/Yashkatiyar24)

---

<p align="center">
  <b>Made with ❤️ using React Native & Expo</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Expo-SDK_54-000020?style=for-the-badge&logo=expo" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript" />
</p>
