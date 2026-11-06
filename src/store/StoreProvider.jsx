"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import { setWishlist } from "./slices/wishlistSlice";

const STORAGE_KEY = "panto-wishlist-v1";

function restoreWishlist() {
  try {
    const storedWishlist = window.localStorage.getItem(STORAGE_KEY);

    if (storedWishlist === null) {
      return [];
    }

    const parsedWishlist = JSON.parse(storedWishlist);

    if (!Array.isArray(parsedWishlist)) {
      console.warn("Ignoring invalid saved Panto wishlist data.");
      window.localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    return parsedWishlist;
  } catch (error) {
    console.error("Unable to restore the saved Panto wishlist:", error);

    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (removeError) {
      console.error("Unable to clear invalid Panto wishlist data:", removeError);
    }

    return [];
  }
}

export default function StoreProvider({ children }) {
  const [store] = useState(makeStore);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const { items, isHydrated } = store.getState().wishlist;

      if (!isHydrated) {
        return;
      }

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error("Unable to save the Panto wishlist:", error);
      }
    });

    store.dispatch(setWishlist(restoreWishlist()));

    return unsubscribe;
  }, [store]);

  return (
    <Provider store={store} serverState={store.getState()}>
      {children}
    </Provider>
  );
}
