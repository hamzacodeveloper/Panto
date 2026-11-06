AGENTS.md

Instructions for AI coding agents working in this repository. Read this file fully before making any change.

1. Project aim

Panto is a responsive furniture storefront and brand-presentation website built with the Next.js App Router. It shows a home page, a product collection, dynamic product detail pages, an about page, and a contact-form preview.

The goal is a polished frontend experience with dummy data. It is NOT a real e-commerce backend: there is no database, authentication, checkout, or payment integration, and none should be added unless explicitly requested.

Naming note: the repository/package is named florifragnance, but all implemented content is for Panto, a modern furniture brand. Do not rename things or "fix" this unless asked.

2. Tech stack
Next.js 16.4.3 (App Router, Turbopack)
React 19.3.0 (React Compiler enabled)
Tailwind CSS 4 (imported in globals.css)
Component-specific plain CSS (src/components/home/home.css) for the main Panto UI
Redux Toolkit (@reduxjs/toolkit + react-redux) for state management (see "State management" in section 7)
ESLint 9 with eslint-config-next (Core Web Vitals)
Geist / Geist Mono via next/font/google
JavaScript/JSX only. Do not use TypeScript.
Import alias: @/* maps to src/*

next.config.mjs enables the React Compiler, Cache Components, partial prefetching, and Next.js agent feedback. This is a recent Next.js version, so do not assume older behavior; check the official Next.js docs when unsure about APIs.

3. Commands

Requirements: Node.js 20.9.0 or newer, npm.

Command	Purpose
npm install	Install dependencies
npm run dev	Start dev server at http://localhost:3000
npm run build	Production build
npm run start	Serve production build (build first)
npm run lint	Run ESLint

Before finishing any task, run npm run lint and, for larger changes, npm run build. Fix errors you introduced.

4. Routes
Path	Page
/	Redirects to /home
/home	Main landing page
/shop	Shop hero + product collection
/shop/[productId]	Product detail page (e.g. /shop/sakarias-armchair)
/about	Brand and design information
/contact	Contact info + form preview
/api/shop-details	JSON API with generated shop details and products
anything else	Custom 404 (not-found.jsx)

Home, shop, about, and contact routes have their own page titles and descriptions. Keep metadata when editing these pages.

5. Project structure
text
src/
  app/
    api/shop-details/route.js   API endpoint
    about/page.jsx
    contact/page.jsx
    home/Home.jsx               Home page composition
    home/page.jsx               Home route + metadata
    shop/page.jsx
    shop/[productId]/page.jsx   Dynamic product detail route
    layout.js                   Root layout, fonts, global styles
    page.js                     Redirect to /home
    loading.jsx                 Route loading UI
    not-found.jsx               Custom 404
    globals.css                 Tailwind import + global styles
  components/home/              All section components + home.css
  data/
    homeData.js                 Product templates, features, reviews, footer data
    shopDetails.js              Server-side dummy shop/catalog generation
  lib/
    shopDetails.js              No-cache server-side API fetch
  store/                        Redux Toolkit store, provider, and slices (created when first needed)
    slices/                     One slice file per feature
docs/
  projectsummary.md             Log of implemented features (see section 9)
public/
  images/home/                  Product, room, review, interface images

Place new code in the matching folder. Reuse existing components in src/components/home/ before creating new ones.

6. Data flow (important)
GET /api/shop-details generates dummy shop + catalog data on the server for every request. Responses use Cache-Control: no-store.
Response shape: { success: true, data: { shop, categories, products } }. Errors return HTTP 500 with { success: false, error: { code: "SHOP_DETAILS_UNAVAILABLE", message } }. Do not change this shape without updating every consumer.
/home and /shop are React Server Components. They fetch the API with cache: "no-store" on the server and pass serializable data as props to the interactive ProductsSection client component.
/shop/[productId] reads the ID from the URL, fetches the catalog on the server, and renders that product. Unknown IDs must show the custom 404.
Prices and ratings are randomized per request. This is intended.
src/data/homeData.js holds static templates (product names/images, features, reviews, footer). src/data/shopDetails.js generates request-time values. src/lib/shopDetails.js is the server-only fetch.
For deployments where the app cannot reach itself at localhost, set SHOP_DETAILS_API_BASE_URL to the public origin. Vercel uses VERCEL_URL automatically.
7. Rules and conventions

Do:

Keep pages as Server Components by default. Add "use client" only to components that need state, effects, or browser APIs.
Write JavaScript/JSX with functional components.
Use the @/ alias for imports from src/.
Keep styling consistent with the existing approach: component CSS in home.css, Tailwind for utilities.
Keep layouts responsive (mobile, tablet, desktop). Test small screens after UI changes.
Use next/image and local images from public/images/home/.
Keep the loading UI (loading.jsx) and custom 404 (not-found.jsx) working.
Keep code simple and readable; match the style of nearby files.

Do NOT:

Convert the project to TypeScript.
Add a database, authentication, payments, or a persistent cart unless explicitly asked.
Change the existing theme, colors, fonts, or overall visual design unless explicitly asked.
Make the shop pages fetch on the client when the server pattern already works.
Add heavy new dependencies without a clear need. Mention any new dependency in your summary.
Remove or rewrite working features while fixing something unrelated.
Edit node_modules, .next, or environment files.
Hardcode secrets or URLs; use environment variables.
State management (Redux Toolkit)

Redux Toolkit is the state management solution for this project.

Use Redux Toolkit for all shared or global client state (for example a persistent bag/cart, if the developer asks for one). Do not introduce other state libraries such as Zustand, Recoil, or React Context for global state.
Plain useState is still fine for purely local UI state (for example an open/closed menu).
@reduxjs/toolkit and react-redux are not installed yet. Adding them is a new dependency, so ask first (section 9), then install both together.
Use modern Redux Toolkit APIs: configureStore, createSlice, and createAsyncThunk when async logic is needed. Do not write legacy switch/case reducers.
App Router rule: create the store with a makeStore() function so each request gets its own store. Do not export one shared store instance at module level.
Wrap the app with a client component ("use client"), for example StoreProvider, that creates the store once with useRef and renders the react-redux Provider. Mount it in src/app/layout.js.
Server Components must not read from or write to the store. They keep fetching data on the server and pass it down as props.
Use useSelector and useDispatch only inside client components.
One slice per feature, in src/store/slices/<feature>Slice.js.
Keep store state serializable (no functions, class instances, or Date objects).
Do not move the existing server-side shop data fetching into Redux or into client-side fetching unless the developer asks.
Existing local state (for example the product bag toggle) stays as it is until the developer approves moving it to Redux.
8. Intentional front-end-only behavior

These controls are previews on purpose. Do not "complete" them into real services without being asked:

Product bag buttons only toggle an "Added to bag" component state. No checkout or persistence.
Category tabs filter the generated catalog (chairs, beds, sofas, lamps) and show an empty-category message when needed.
Hero search form only navigates to the products section; it does not search or filter.
Contact form validates required name, email, and message in the browser, then shows a notice that the message was not sent. No messaging service exists.
Testimonials carousel uses previous/next controls to scroll review cards.
Footer social links go to network homepages; policy and other footer links are placeholders.
9. Feature implementation workflow (mandatory)

Whenever the developer asks you to implement any functionality (a new feature, a behavior change, or turning a preview control into something real), follow these steps in order. Do not skip or reorder them.

Ask for permission first. Do not write or change any code yet. Briefly explain what you plan to implement, which files will be touched, whether a new dependency is needed, and whether it changes any behavior listed in section 8. Then wait for the developer's clear approval (for example "yes" or "go ahead").
Implement only the approved scope. Do not add extra features on the side.
Audit the new functionality to confirm it works properly:
Run npm run lint and npm run build.
Walk through the feature in the relevant routes and check the normal flow.
Check edge cases: empty states, unknown product IDs, API failure, and small screens.
Check that existing features still work and nothing was broken.
Fix errors. If the audit finds any error or broken behavior, fix it.
Audit again after every fix. Repeat steps 4 and 5 until the audit passes with no errors.
Update the project summary once the feature is complete and the audit passes (details below).
Report to the developer: what was implemented, which files changed, what the audit checked, and which errors were found and fixed.
Project summary file (docs/projectsummary.md)

After every completed feature, record it in docs/projectsummary.md:

Check whether a docs folder exists at the project root.
If the docs folder does not exist, create it first.
Inside docs, check for projectsummary.md (use exactly this file name).
If it does not exist, create it with the title # Project Summary and add the first feature entry.
If it exists, add the new feature entry to it. Never delete or overwrite older entries.
If an existing feature is changed or fixed later, update its entry and add the new date. Do not create a duplicate entry.

Each feature entry must include:

Feature name
Date implemented (YYYY-MM-DD; use the real current date, never guess)
Status (Completed, In progress, or Needs attention)
What was implemented (a short description)
Files created or changed
Errors found and fixed (what the error was, and how it was fixed; write "None" if there were no errors)
Audit result (what was checked, how many audit rounds were needed, and the final result)
Remaining issues or notes (anything still pending; write "None" if nothing)

Use this format:

markdown
## Feature: <feature name>

- **Date implemented:** YYYY-MM-DD
- **Status:** Completed
- **What was implemented:** ...
- **Files created or changed:** ...
- **Errors found and fixed:**
  - <error> -> <how it was fixed>
- **Audit result:** ... (rounds: N, final result: passed)
- **Remaining issues or notes:** None

Notes:

Reading code, explaining things, and answering questions do not need this workflow.
If you are unsure whether a task counts as "functionality", ask the developer before starting.
10. Working style for agents
Read the relevant files before editing. Do not guess the structure.
Make the smallest change that solves the task.
Follow the existing patterns instead of introducing new ones.
If a request conflicts with the rules above, ask before proceeding.
After changes, run lint (and build when needed) and report what you changed, which files were touched, and anything the developer should check.
If this file becomes outdated (new route, library, or rule), update it as part of the same task.