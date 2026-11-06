import { generateShopDetails } from "../../../data/shopDetails";

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

export async function GET() {
  try {
    return Response.json(
      {
        success: true,
        data: generateShopDetails(),
      },
      { headers: noStoreHeaders },
    );
  } catch (error) {
    console.error("Failed to generate shop details:", error);

    return Response.json(
      {
        success: false,
        error: {
          code: "SHOP_DETAILS_UNAVAILABLE",
          message: "Shop details could not be generated.",
        },
      },
      {
        status: 500,
        headers: noStoreHeaders,
      },
    );
  }
}
