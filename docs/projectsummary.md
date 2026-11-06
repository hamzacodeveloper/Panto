# Project Summary

## Feature: Dynamic product detail pages

- **Date implemented:** 2026-11-05
- **Status:** Completed
- **What was implemented:** Added server-rendered product detail pages at `/shop/[productId]`. Product images and names link to the matching detail page, which shows the product image, category, description, request-time price and rating, plus links back to the shop and to contact. Added product descriptions and product-specific page metadata while preserving the existing product category filters and add-to-bag preview.
- **Files created or changed:** `src/app/home/page.jsx`, `src/app/shop/page.jsx`, `src/app/shop/[productId]/page.jsx`, `src/components/home/ProductsSection.jsx`, `src/components/home/home.css`, `src/data/homeData.js`, `README.md`, `docs/projectsummary.md`.
- **Errors found and fixed:**
  - Product detail pages inherited the starter title “Create Next App” -> Added product-specific metadata using the product template.
  - Unknown product IDs were not checked until after loading the catalog -> Validate IDs against known product templates before loading details so the custom not-found UI is selected without relying on randomized API data.
  - Home, shop, and product routes called the request-time marker at the page boundary, triggering the reported rendering error -> Moved `connection()` into async server components behind explicit Suspense boundaries, so prerendering can return a fallback and data fetching waits for a real request.
- **Audit result:** Ran `npm run lint` and `npm run build`; exercised the shop-to-product navigation for all seven products, category filtering, add-to-bag behavior, unknown IDs, API failure states, and existing home/about/contact routes. Checked the detail layout at a 360px viewport with no horizontal overflow. Re-ran lint and build after the metadata fix; the request-time rendering boundary was subsequently fixed and rechecked with lint, a clean build, and development-server requests for `/home`, `/shop`, and `/shop/sakarias-armchair` (rounds: 3, final result: passed).
- **Remaining issues or notes:** With Next.js Cache Components and partial rendering, the custom not-found UI for an unknown product can be streamed with HTTP 200. Product prices and ratings are intentionally generated per request and may differ between the catalog and a later detail-page request.

## Feature: Redux Toolkit wishlist

- **Date implemented:** 2026-11-05
- **Status:** Completed
- **What was implemented:** Added a global Redux Toolkit wishlist with duplicate-ID protection, validation, selectors, and browser persistence. Product cards and product detail pages can toggle saved products; the desktop/mobile navigation displays the live count. Added a responsive `/wishlist` page with remove, clear-all, loading, and empty states.
- **Files created:** `src/store/store.js`, `src/store/StoreProvider.jsx`, `src/store/slices/wishlistSlice.js`, `src/store/slices/wishlistSelectors.js`, `src/components/home/ProductCard.jsx`, `src/components/home/WishlistButton.jsx`, `src/components/home/WishlistNavigationLink.jsx`, `src/components/home/WishlistContent.jsx`, `src/app/wishlist/page.jsx`.
- **Files changed:** `package.json`, `package-lock.json`, `src/app/layout.js`, `src/app/shop/[productId]/page.jsx`, `src/components/home/HeroSection.jsx`, `src/components/home/ProductsSection.jsx`, `src/components/home/home.css`, `README.md`, `docs/projectsummary.md`.
- **Errors found and fixed:**
  - Product-card content overlapped the heart button and intercepted clicks -> Raised the product-media stacking layer.
  - Product detail pages had no direct wishlist control -> Reused the accessible Redux-backed heart button beside the existing product action.
  - Redux hydration needed an explicit server snapshot -> Passed the initial store state to React-Redux `Provider`.
  - Fixed ESLint issues from the first integration and preserved the per-render store factory required by the Next.js App Router.
- **Audit result:** `npm run lint` and `npm run build` passed after the final implementation. Verified `GET /api/shop-details` returns HTTP 200 with valid shop details, four categories, and seven products. Production browser checks covered adding/toggling/removing items from home, shop, and product detail pages; navigation count updates; product detail navigation remains unaffected by the heart button; persistence through refresh; duplicate IDs in stored data; clearing and empty states; malformed localStorage recovery; mobile navigation; and no horizontal overflow at 390px. Existing add-to-bag feedback remained functional. No React hydration errors were observed in the final checks.
- **Remaining issues or notes:** The bag remains a component-state preview and is not part of this wishlist feature. The generated product data and wishlist are local demo functionality; no database or backend wishlist was added.
