import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishlistSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      wishlist: wishlistReducer,
    },
  });
}
