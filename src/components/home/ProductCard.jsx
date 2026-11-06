"use client";

import Image from "next/image";
import Link from "next/link";
import WishlistButton from "./WishlistButton";

export default function ProductCard({
  product,
  isAdded = false,
  onToggleCart,
  showBag = true,
}) {
  return (
    <article className="panto-product-card">
      <div className="panto-product-media">
        <Image
          className="panto-product-card-backdrop"
          src="/images/home/imgRectangle55.svg"
          alt=""
          fill
          aria-hidden="true"
        />
        <Link
          className="panto-product-detail-image-link"
          href={`/shop/${product.id}`}
          aria-label={`View ${product.name} details`}
        >
          <Image
            className="panto-product-image"
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 700px) 80vw, 218px"
          />
        </Link>
        <WishlistButton product={product} />
      </div>
      <div className="panto-product-info">
        <p className="panto-product-category">{product.category}</p>
        <h3>
          <Link href={`/shop/${product.id}`}>{product.name}</Link>
        </h3>
        <div
          className="panto-product-rating"
          aria-label={`${product.rating.toFixed(1)} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Image
              key={index}
              className={
                index < Math.round(product.rating)
                  ? undefined
                  : "panto-rating-star-muted"
              }
              src="/images/home/imgStar.svg"
              width={16}
              height={16}
              alt=""
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="panto-product-bottom">
          <p className="panto-product-price">
            <span>$</span>
            {product.price}
          </p>
          {showBag && (
            <button
              className="panto-add-button"
              type="button"
              aria-label={
                isAdded
                  ? `Remove ${product.name} from bag`
                  : `Add ${product.name} to bag`
              }
              aria-pressed={isAdded}
              onClick={() => onToggleCart(product.id)}
            >
              <Image
                src={
                  isAdded
                    ? "/images/home/imgGroup1.svg"
                    : "/images/home/imgBxBxPlus.svg"
                }
                width={24}
                height={24}
                alt=""
                aria-hidden="true"
              />
            </button>
          )}
        </div>
        {isAdded && showBag && (
          <p className="panto-added-status" role="status">
            Added to bag
          </p>
        )}
      </div>
    </article>
  );
}
