import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isHydrated: false,
};

function isValidProduct(product) {
  return (
    product &&
    typeof product.id === "string" &&
    product.id.length > 0 &&
    typeof product.name === "string" &&
    typeof product.category === "string" &&
    typeof product.description === "string" &&
    typeof product.image === "string" &&
    product.image.startsWith("/images/") &&
    Number.isFinite(product.price) &&
    product.price >= 0 &&
    Number.isFinite(product.rating) &&
    product.rating >= 0 &&
    product.rating <= 5
  );
}

function sanitizeProducts(products) {
  if (!Array.isArray(products)) {
    return [];
  }

  const seenIds = new Set();

  return products
    .filter((product) => {
      if (!isValidProduct(product) || seenIds.has(product.id)) {
        return false;
      }

      seenIds.add(product.id);
      return true;
    })
    .map(({ id, name, category, description, image, price, rating }) => ({
      id,
      name,
      category,
      description,
      image,
      price,
      rating,
    }));
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const [product] = sanitizeProducts([action.payload]);

      if (product && !state.items.some((item) => item.id === product.id)) {
        state.items.push(product);
      }
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleWishlist(state, action) {
      const [product] = sanitizeProducts([action.payload]);

      if (!product) {
        return;
      }

      const existingIndex = state.items.findIndex(
        (item) => item.id === product.id,
      );

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(product);
      }
    },
    clearWishlist(state) {
      state.items = [];
    },
    setWishlist(state, action) {
      state.items = sanitizeProducts(action.payload);
      state.isHydrated = true;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  setWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
