import { Suspense } from "react";
import FooterSection from "../../components/home/FooterSection";
import HeroSection from "../../components/home/HeroSection";
import PantoPageShell from "../../components/home/PantoPageShell";
import ProductsSection from "../../components/home/ProductsSection";
import { connection } from "next/server";
import Loading from "../loading";
import { getShopDetails } from "../../lib/shopDetails";

export const metadata = {
  title: "Shop Panto | Modern Furniture",
  description:
    "Browse Panto’s collection of modern furniture for a more comfortable home.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ShopWithDetails />
    </Suspense>
  );
}

async function ShopWithDetails() {
  await connection();

  let shopDetails = null;
  let shopDetailsError = null;

  try {
    shopDetails = await getShopDetails();
  } catch (error) {
    console.error("Failed to load shop details for the shop page:", error);
    shopDetailsError = "Shop details are temporarily unavailable.";
  }

  return (
    <PantoPageShell>
      <HeroSection
        compact
        showHotspots={false}
        showSearch={false}
        titleLines={[
          shopDetails?.shop.name ?? "Find the right furniture",
          "for your space",
        ]}
        description={
          shopDetails?.shop.description ??
          "Explore comfortable, modern furniture designed to make home feel more like you."
        }
      />
      <ProductsSection
        title="Shop our collection"
        categories={shopDetails?.categories ?? []}
        products={shopDetails?.products ?? []}
        shop={shopDetails?.shop}
        shopDetailsError={shopDetailsError}
      />
      <FooterSection />
    </PantoPageShell>
  );
}
