import { Suspense } from "react";
import Home from "./Home";
import { connection } from "next/server";
import Loading from "../loading";
import { getShopDetails } from "../../lib/shopDetails";

export const metadata = {
  title: "Panto | Modern Furniture",
  description:
    "Discover modern, minimalist furniture and interiors from Panto.",
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeWithShopDetails />
    </Suspense>
  );
}

async function HomeWithShopDetails() {
  await connection();

  let shopDetails = null;
  let shopDetailsError = null;

  try {
    shopDetails = await getShopDetails();
  } catch (error) {
    console.error("Failed to load shop details for the home page:", error);
    shopDetailsError = "Shop details are temporarily unavailable.";
  }

  return (
    <Home
      shopDetails={shopDetails}
      shopDetailsError={shopDetailsError}
    />
  );
}
