"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { clearWishlist } from "../../store/slices/wishlistSlice";
import {
  selectWishlistCount,
  selectWishlistHydrated,
  selectWishlistItems,
} from "../../store/slices/wishlistSelectors";

export default function WishlistContent() {
  const dispatch = useDispatch();
  const products = useSelector(selectWishlistItems);
  const count = useSelector(selectWishlistCount);
  const isHydrated = useSelector(selectWishlistHydrated);

  return (
    <section className="panto-wishlist-section" aria-labelledby="wishlist-title">
      <div className="panto-products-container">
        <div className="panto-wishlist-heading">
          <div>
            <h2 className="panto-section-title" id="wishlist-title">
              Your Wishlist
            </h2>
            <p aria-live="polite">
              {isHydrated
                ? `${count} ${count === 1 ? "item" : "items"} saved`
                : "Loading your saved items…"}
            </p>
          </div>
          {isHydrated && count > 0 && (
            <button
              className="panto-wishlist-clear"
              type="button"
              onClick={() => dispatch(clearWishlist())}
            >
              Clear wishlist
            </button>
          )}
        </div>

        {!isHydrated ? (
          <p className="panto-wishlist-loading" role="status">
            Restoring your saved items…
          </p>
        ) : count === 0 ? (
          <div className="panto-wishlist-empty">
            <svg
              viewBox="0 0 64 64"
              aria-hidden="true"
              focusable="false"
              fill="none"
            >
              <path
                d="M54 12a14 14 0 0 0-20 0l-2 2-2-2a14 14 0 0 0-20 20l2 2 20 19 20-19 2-2a14 14 0 0 0 0-20Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3>Your wishlist is waiting for favorites</h3>
            <p>Save the pieces you love and find them here whenever you return.</p>
            <Link className="panto-wishlist-continue" href="/shop">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="panto-product-grid panto-wishlist-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} showBag={false} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
