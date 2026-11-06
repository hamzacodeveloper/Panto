"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import {
  selectIsInWishlist,
  selectWishlistHydrated,
} from "../../store/slices/wishlistSelectors";

export default function WishlistButton({ product, className = "" }) {
  const dispatch = useDispatch();
  const isSaved = useSelector((state) =>
    selectIsInWishlist(state, product.id),
  );
  const isHydrated = useSelector(selectWishlistHydrated);

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(toggleWishlist(product));
  }

  return (
    <button
      className={`panto-wishlist-button ${className}`.trim()}
      type="button"
      aria-label={
        isSaved
          ? `Remove ${product.name} from wishlist`
          : `Add ${product.name} to wishlist`
      }
      aria-pressed={isSaved}
      disabled={!isHydrated}
      onClick={handleClick}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        fill={isSaved ? "currentColor" : "none"}
      >
        <path
          d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
