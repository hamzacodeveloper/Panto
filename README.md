# Panto — Modern Furniture

Panto is a responsive furniture storefront and brand-presentation website built with the Next.js App Router. The experience includes a home page, a product collection, brand information, a contact-form preview, and a custom not-found page.

> **Project naming:** The repository/package is named `florifragnance`, but the implemented website and its content are for **Panto**, a modern furniture brand.

## Features

- **Home page:** Hero banner, feature highlights, product collection, experience and materials sections, client testimonials, and footer.
- **Shop page:** Compact hero and the product collection.
- **Dynamic product pages:** Open a product image or name to view its own detail page at `/shop/[productId]`.
- **About page:** Brand introduction, features, experience, materials, and testimonials.
- **Contact page:** Contact form with required name, email, and message fields.
- **Responsive navigation:** Full navigation on larger screens and a native expandable menu on small screens.
- **Product browsing:** Furniture category tabs, product cards, prices, ratings, and empty-category messaging.
- **Wishlist:** Redux Toolkit wishlist controls on product cards and product detail pages, a live navigation count, and a responsive `/wishlist` page with localStorage persistence.
- **Shop details API:** Request-time dummy shop and product data, including shop contact details, categories, local image paths, randomized prices, and ratings.
- **Product bag preview:** Product buttons toggle an “Added to bag” state.
- **Testimonials carousel:** Previous/next controls scroll through review cards.
- **Loading and not-found states:** Branded route loading indicator and custom 404 page.
- **Local visual assets:** Product, interior, testimonial, and interface images are served from `public/`.

## Routes

| Path | Page |
| --- | --- |
| `/` | Redirects to `/home`. |
| `/home` | Main Panto landing page. |
| `/shop` | Shop hero and product collection. |
| `/shop/[productId]` | Dynamic product detail page (for example, `/shop/sakarias-armchair`). |
| `/wishlist` | Saved products with remove and clear controls. |
| `/about` | Brand and design information. |
| `/contact` | Contact information and form preview. |
| `/api/shop-details` | JSON API for generated shop details and products. |
| Other paths | Custom 404 page. |

Page-specific titles and descriptions are set on the home, shop, about, and contact routes.

## Technology

- **Next.js 16.4.3** — App Router, route rendering, navigation, and image optimization.
- **React 19.3.0** — UI components and client-side interactions.
- **Redux Toolkit 2** and **React-Redux 9** — Shared wishlist state with browser persistence.
- **Tailwind CSS 4** — Imported in the global stylesheet and connected through the Turbopack CSS loader.
- **CSS** — The Panto interface is primarily styled with component-specific CSS, including responsive breakpoints.
- **ESLint 9** with `eslint-config-next` — Linting.
- **Geist / Geist Mono** — Fonts loaded through `next/font/google`.

The application is JavaScript/JSX (not TypeScript). The `@/*` import alias points to `src/*`.

## Getting started

### Requirements

- Node.js **20.9.0 or newer**
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root path redirects to `/home`.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build (run `npm run build` first). |
| `npm run lint` | Run ESLint. |

## Project structure

```text
src/
  app/
    api/shop-details/route.js API endpoint
    about/page.jsx          About route
    contact/page.jsx        Contact route
    home/
      Home.jsx              Home page composition
      page.jsx              Home route and metadata
    shop/page.jsx           Shop route
    shop/[productId]/page.jsx Dynamic product detail route
    wishlist/page.jsx       Wishlist route
    layout.js               Root layout, fonts, and global styles
    page.js                 Root redirect to /home
    loading.jsx             Route loading UI
    not-found.jsx           Custom 404 page
    globals.css             Tailwind import and global styles
  components/home/
    ContactSection.jsx
    ExperienceSection.jsx
    FeaturesSection.jsx
    FooterSection.jsx
    HeroSection.jsx
    MaterialsSection.jsx
    MoreInfoLink.jsx
    PantoPageShell.jsx
    ProductsSection.jsx
    ProductCard.jsx
    WishlistButton.jsx
    WishlistContent.jsx
    WishlistNavigationLink.jsx
    TestimonialsSection.jsx
    home.css                Panto component styles and responsive layouts
  data/
    homeData.js             Product templates, feature, review, and footer data
    shopDetails.js          Server-side dummy shop and catalog generation
  lib/
    shopDetails.js          No-cache server-side API fetch
  store/
    store.js                Per-request Redux store factory
    StoreProvider.jsx       Client store provider and wishlist persistence
    slices/
      wishlistSlice.js      Wishlist reducers and actions
      wishlistSelectors.js  Reusable wishlist selectors
public/
  images/home/              Panto product, room, review, and interface artwork
  *.svg                     Default Next.js starter artwork
```

## Data and interactions

The shop-details API is `GET /api/shop-details`. It generates its data on the server for each request; it does not use a database or external service. Responses are marked `Cache-Control: no-store`.

Successful responses have this shape:

```json
{
  "success": true,
  "data": {
    "shop": {
      "name": "Panto Living",
      "description": "Thoughtfully selected furniture for comfortable, modern everyday living.",
      "address": "123 Willow Avenue, Brookside, CA 90210, United States",
      "contact": {
        "phone": "+1 (555) 010-12",
        "email": "hello1234@panto.example",
        "hours": "Monday–Saturday, 9:00 AM–6:00 PM"
      }
    },
    "categories": [{ "id": "chair", "name": "Chair" }],
    "products": [
      {
        "id": "sakarias-armchair",
        "name": "Sakarias Armchair",
        "category": "Chair",
        "description": "A generously cushioned armchair with a sculpted silhouette.",
        "price": 392,
        "rating": 4.7,
        "image": "/images/home/imgSakariasArmchairBlackSpordaDarkGray0729767Pe737131S5Adobespark.png"
      }
    ]
  }
}
```

The actual response includes all configured categories and product templates. Prices, ratings, shop profile, and contact/address details are generated randomly. Product image URLs point to assets in `public/images/home/`. Generation errors return HTTP 500 with `{ "success": false, "error": { "code": "SHOP_DETAILS_UNAVAILABLE", "message": "..." } }`.

The `/home` and `/shop` pages remain React Server Components. They fetch `/api/shop-details` with `cache: "no-store"` on the server, then pass the serializable shop/catalog data as props to the existing interactive `ProductsSection` client component. The shop page also renders the generated shop description, address, contact details, and hours. If loading fails, the page logs the server error and displays an availability message; the route loading UI remains provided by `src/app/loading.jsx`.

Product images and names link to `/shop/<productId>`. That dynamic route reads the product ID from the URL, fetches the catalog on the server, and renders the selected product's image, category, description, generated price, and rating. Unknown product IDs use the site's custom 404 page. Product detail data is request-time dummy data, so its randomized price and rating can change on a later visit.

The wishlist uses Redux Toolkit with a store created per application render and a client-side provider mounted by the root layout. Its state is `{ items, isHydrated }`; each saved item contains its product ID, name, category, description, image path, price, and rating. The slice exports `addToWishlist`, `removeFromWishlist`, `toggleWishlist`, `clearWishlist`, and `setWishlist`. Reusable selectors expose wishlist items, item count, hydration status, and whether a product ID is saved.

After the provider mounts, it safely restores and validates `panto-wishlist-v1` from `localStorage`, then subscribes to store updates and persists changes. Browser storage is never read during server rendering. Wishlist controls remain disabled until restoration completes, and the wishlist page shows a loading state during hydration to avoid displaying a false empty state. Corrupt or invalid saved entries are discarded. Product card and detail-page hearts, the shared desktop/mobile navigation count, and `/wishlist` all read from the same Redux state.

`src/data/homeData.js` contains product image/name templates and the other static presentation content. `src/data/shopDetails.js` generates request-time dummy shop and catalog values; `src/lib/shopDetails.js` performs the server-only API fetch. For deployments where the app cannot reach itself at `localhost`, set `SHOP_DETAILS_API_BASE_URL` to the app's public origin (for example, `https://store.example.com`). Vercel deployments use `VERCEL_URL` automatically when the setting is not provided.

Some visible controls are intentionally front-end previews rather than connected services:

- The product bag buttons only toggle component state; there is no checkout, persistent cart, or backend.
- Category tabs filter the generated product catalog across chairs, beds, sofas, and lamps.
- The hero search form navigates to the products section; it does not search or filter products.
- The contact form validates required fields in the browser and displays a notice that the message has **not** been sent. No messaging service is configured.
- Footer social links go to the corresponding social-network homepages; policy and footer links are placeholders.

There is no database, authentication, or payment integration. The API is a local dummy-data endpoint, not a persistent product or order service.

## Configuration notes

- `next.config.mjs` enables the React Compiler, Cache Components, partial prefetching, and Next.js agent feedback, and configures the Tailwind CSS Turbopack loader.
- `.gitignore` excludes dependencies, Next.js build output, coverage, and environment files.
- `eslint.config.mjs` uses the Next.js Core Web Vitals ESLint configuration.
- `jsconfig.json` defines the `@/*` source import alias.
