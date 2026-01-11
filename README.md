# 🛍️ Shopease - E-Commerce Mobile App

A modern, minimalist e-commerce mobile application built with **React Native** and **Expo**. This app delivers a smooth shopping experience including product browsing, cart management, swipe gestures, and a multi-step checkout flow.

---

## 🎬 Demo Video

https://github.com/user-attachments/assets/12df1937-2b70-4195-8699-3ff3f68ccab8

---

## 📱 Screenshots

<p align="center">
  <img src="./screenshots/home.png" width="250" alt="Home Screen" />
  &nbsp;&nbsp;&nbsp;
  <img src="./screenshots/cart.png" width="250" alt="Cart Screen" />
  &nbsp;&nbsp;&nbsp;
  <img src="./screenshots/checkout.png" width="250" alt="Checkout Screen" />
</p>

<table align="center">
  <tr>
    <th>Home</th>
    <th>Cart</th>
    <th>Checkout</th>
  </tr>
  <tr>
    <td align="center">Product listing & search</td>
    <td align="center">Swipe & quantity updates</td>
    <td align="center">Multi-step checkout</td>
  </tr>
</table>

---

## ✨ Features

| Feature | Description |
|-------|-------------|
| 🔍 Product Search | Real-time filtering by name and category |
| 🛒 Cart Management | Add/remove items, update quantity, swipe-to-delete |
| 📦 Product Details | Product page with size selection |
| 💳 Multi-step Checkout | Address, user details, and payment selection |
| 💾 Persistent Cart | Saved locally using AsyncStorage |
| 🎨 Clean UI | Minimal design with smooth animations |
| 💰 INR Currency | Prices displayed in Indian Rupees |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|----------|--------|
| React Native 0.81 | Cross-platform mobile framework |
| Expo SDK 54 | Build & development toolchain |
| TypeScript 5.9 | Type-safe development |
| React Navigation 7 | Navigation system |
| Context API | Global state management |
| AsyncStorage | Local data persistence |
| Gesture Handler | Swipe interactions |

---

## 🏗️ State Management

The app uses **React Context API** for managing global cart state.

```
src/context/
└── CartContext.tsx    # Cart state with AsyncStorage persistence
```

### Why Context API?

| Reason | Description |
|--------|-------------|
| ✅ Lightweight | No external dependencies needed |
| ✅ Built-in | Native to React, minimal learning curve |
| ✅ Sufficient | Perfect for small-to-medium apps |
| ✅ Persistent | Combined with AsyncStorage for data persistence |

### Cart Features:
- Add/remove items
- Update quantities
- Calculate totals
- Persist between app restarts
- Clear cart after checkout

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Expo Go** app on your device
  - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS](https://apps.apple.com/app/expo-go/id982107779)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Yashkatiyar24/E-commerce-app.git
cd E-commerce-app
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm start
```

**4. Run on device**
- Scan QR code with **Expo Go** (Android) or Camera (iOS)
- Or press `a` for Android emulator / `i` for iOS simulator

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo dev server |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npm run web` | Run in browser |

---

## 📂 Project Structure

```
E-commerce-app/
├── App.tsx                         # Root with splash screen
├── src/
│   ├── context/
│   │   └── CartContext.tsx         # Cart state management
│   ├── data/
│   │   └── products.ts             # Product catalog
│   ├── navigation/
│   │   └── types.ts                # Navigation types
│   ├── screens/
│   │   ├── HomeScreen.tsx          # Product listing + search
│   │   ├── ProductDetailScreen.tsx # Product details
│   │   ├── CartScreen.tsx          # Shopping cart
│   │   ├── CheckoutScreen.tsx      # Multi-step checkout
│   │   └── ConfirmationScreen.tsx  # Order confirmation
│   ├── theme.ts                    # Colors & styles
│   └── types.ts                    # TypeScript interfaces
└── assets/                         # Images & icons
```

---

## ⚖️ Assumptions & Trade-offs

### Assumptions Made

| Assumption | Reasoning |
|------------|-----------|
| **Static Product Data** | Products hardcoded; production would use API |
| **No Authentication** | Simplified checkout without login |
| **Local Storage Only** | Cart stored locally, no cloud sync |
| **Single Currency (INR)** | Targeting Indian market |
| **Internet Required** | Product images loaded from URLs |

### Trade-offs

| Decision | Pros | Cons |
|----------|------|------|
| **Context API over Redux** | Simpler, less boilerplate | Less scalable for complex state |
| **AsyncStorage over SQLite** | Easy key-value storage | Limited query capabilities |
| **Expo Managed Workflow** | Fast development, OTA updates | Limited native module access |
| **External Image URLs** | Smaller bundle size | Requires internet |
| **No Backend** | Simpler demo | No real order processing |

### Design Decisions

| Decision | Reasoning |
|----------|-----------|
| **Custom Splash Screen** | Native splash doesn't work in Expo Go |
| **Swipe Gestures** | Intuitive mobile UX for cart actions |
| **Multi-step Checkout** | Better UX than single long form |
| **Real-time Search** | Instant feedback as user types |

---

## 📦 Build APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build -p android --profile preview
```

---

## 👨‍💻 Author

**Yash Katiyar**

[![GitHub](https://img.shields.io/badge/GitHub-@Yashkatiyar24-181717?style=for-the-badge&logo=github)](https://github.com/Yashkatiyar24)

---

<p align="center">
  <strong>Made with ❤️ using React Native & Expo</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-SDK_54-000020?style=for-the-badge&logo=expo" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
</p>