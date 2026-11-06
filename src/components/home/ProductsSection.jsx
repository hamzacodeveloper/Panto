"use client";

import Image from "next/image";
import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductsSection({
  title = "Best Selling Product",
  showCategories = true,
  categories,
  products,
  shop,
  shopDetailsError,
}) {
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.name ?? null,
  );
  const [addedProducts, setAddedProducts] = useState([]);
  const visibleProducts = products.filter(
    (product) => !showCategories || product.category === activeCategory,
  );

  function toggleCart(productId) {
    setAddedProducts((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  return (
    <section
      className={`panto-products-section${showCategories ? "" : " panto-products-section-shop"}`}
      id="products"
      aria-labelledby="products-title"
    >
      <div className={"panto-products-container"}>
        <h2 className={"panto-section-title"} id="products-title">
          {title}
        </h2>
        {showCategories && (
          <div
            className={"panto-category-tabs"}
            aria-label="Furniture categories"
          >
            {categories.map((category) => (
              <button
                className={
                  category.name === activeCategory
                    ? `${"panto-category-button"} ${"panto-category-active"}`
                    : "panto-category-button"
                }
                key={category.id}
                type="button"
                aria-pressed={category.name === activeCategory}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {shop && (
          <address className="panto-shop-contact">
            <span>{shop.address}</span>
            <a href={`tel:${shop.contact.phone}`}>{shop.contact.phone}</a>
            <a href={`mailto:${shop.contact.email}`}>{shop.contact.email}</a>
            <span>{shop.contact.hours}</span>
          </address>
        )}

        <div className={"panto-product-grid"}>
          {shopDetailsError ? (
            <p className="panto-no-products" role="alert">
              {shopDetailsError}
            </p>
          ) : visibleProducts.length ? (
            visibleProducts.map((product) => {
              const isAdded = addedProducts.includes(product.id);

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdded={isAdded}
                  onToggleCart={toggleCart}
                />
              );
            })
          ) : (
            <p className={"panto-no-products"} role="status">
              No {activeCategory.toLowerCase()} are available in this collection
              yet.
            </p>
          )}
        </div>
        <a className={"panto-view-all"} href="#footer">
          View All
          <Image
            src="/images/home/imgGrommetIconsFormNextLink.svg"
            width={48}
            height={24}
            alt=""
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
