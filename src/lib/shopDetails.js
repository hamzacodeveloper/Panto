import "server-only";

function getApiUrl() {
  const baseUrl =
    process.env.SHOP_DETAILS_API_BASE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT ?? "3000"}`);
  const apiUrl = new URL("/api/shop-details", baseUrl);

  if (apiUrl.protocol !== "http:" && apiUrl.protocol !== "https:") {
    throw new Error("The shop details API URL must use HTTP or HTTPS.");
  }

  return apiUrl;
}

export async function getShopDetails() {
  const response = await fetch(getApiUrl(), { cache: "no-store" });

  if (!response.ok) {
    throw new Error(
      `The shop details API returned HTTP ${response.status}.`,
    );
  }

  const result = await response.json();

  if (
    result?.success !== true ||
    !result.data?.shop ||
    !Array.isArray(result.data.categories) ||
    !Array.isArray(result.data.products)
  ) {
    throw new Error("The shop details API returned an invalid response.");
  }

  return result.data;
}
