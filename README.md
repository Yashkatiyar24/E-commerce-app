This repo now has both the original Next.js web app and a matching React Native (Expo) app with the same flow (home, product detail, cart, checkout, confirmation) backed by mock data.

## Web (Next.js)
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Mobile (React Native / Expo)
```bash
cd native-app
npm install
npm run ios    # or npm run android / npm run web
```

Features mirrored from the web app:
- Home feed with categories, search, and quick add to cart
- Product detail with gallery, sizes, and quantity stepper
- Cart with quantity adjust/remove, totals, and checkout entry
- Three-step checkout with validation and mock payment options
- Order confirmation with summary and continue-shopping action
