"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import {
  selectWishlistCount,
  selectWishlistHydrated,
} from "../../store/slices/wishlistSelectors";

export default function WishlistNavigationLink() {
  const count = useSelector(selectWishlistCount);
  const isHydrated = useSelector(selectWishlistHydrated);

  return (
    <Link
      className="panto-wishlist-navigation-link"
      href="/wishlist"
      aria-label={`Wishlist, ${count} ${count === 1 ? "item" : "items"}`}
      aria-busy={!isHydrated}
    >
      Wishlist
      <span className="panto-wishlist-navigation-count">{count}</span>
    </Link>
  );
}
