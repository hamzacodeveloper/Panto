import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import FooterSection from "../../../components/home/FooterSection";
import HeroSection from "../../../components/home/HeroSection";
import Loading from "../../loading";
import PantoPageShell from "../../../components/home/PantoPageShell";
import WishlistButton from "../../../components/home/WishlistButton";
import { products as productTemplates } from "../../../data/homeData";
import { getShopDetails } from "../../../lib/shopDetails";

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const product = productTemplates.find((item) => item.id === productId);

  if (!product) {
    return {
      title: "Product Not Found | Panto",
    };
  }

  return {
    title: `${product.name} | Panto`,
    description: product.description,
  };
}

export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<Loading />}>
      <ProductPageContent params={params} />
    </Suspense>
  );
}

async function ProductPageContent({ params }) {
  const { productId } = await params;

  if (!productTemplates.some((product) => product.id === productId)) {
    notFound();
  }

  await connection();

  let shopDetails;

  try {
    shopDetails = await getShopDetails();
  } catch (error) {
    console.error("Failed to load product details:", error);

    return (
      <PantoPageShell>
        <HeroSection
          compact
          showHotspots={false}
          showSearch={false}
          titleLines={["Product details unavailable"]}
          description="We couldn’t load this product right now. Please try again."
        />
        <section className="panto-product-detail-error" role="alert">
          <p>Product details are temporarily unavailable.</p>
          <Link href="/shop">Back to shop</Link>
        </section>
        <FooterSection />
      </PantoPageShell>
    );
  }

  const product = shopDetails.products.find((item) => item.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <PantoPageShell>
      <HeroSection
        compact
        showHotspots={false}
        showSearch={false}
        titleLines={[product.name]}
        description={product.description}
      />
      <section
        className="panto-product-detail-section"
        aria-labelledby="product-detail-title"
      >
        <div className="panto-product-detail-layout">
          <div className="panto-product-detail-image">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </div>
          <div className="panto-product-detail-copy">
            <Link className="panto-product-detail-back" href="/shop">
              <span aria-hidden="true">←</span> Back to shop
            </Link>
            <p className="panto-section-eyebrow">{product.category}</p>
            <h2 id="product-detail-title">{product.name}</h2>
            <div
              className="panto-product-rating panto-product-detail-rating"
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
              <span>{product.rating.toFixed(1)} / 5</span>
            </div>
            <p className="panto-product-detail-description">
              {product.description}
            </p>
            <p className="panto-product-detail-price">
              <span>$</span>
              {product.price}
            </p>
            <p className="panto-product-detail-availability">
              Made for comfortable, everyday living.
            </p>
            <div className="panto-product-detail-actions">
              <Link className="panto-product-detail-cta" href="/contact">
                Ask us about this piece
              </Link>
              <WishlistButton
                className="panto-product-detail-wishlist"
                product={product}
              />
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </PantoPageShell>
  );
}
