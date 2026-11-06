import { productCategories, products } from "./homeData";

const shopProfiles = [
  {
    name: "Panto Living",
    description:
      "Thoughtfully selected furniture for comfortable, modern everyday living.",
  },
  {
    name: "Panto Home Studio",
    description:
      "Explore timeless furniture and considered details for every room at home.",
  },
  {
    name: "Panto Design House",
    description:
      "Discover inviting furniture that brings modern design and comfort together.",
  },
];

const streets = ["Willow Avenue", "Cedar Street", "Maple Road"];
const cities = [
  { name: "Brookside", region: "CA", postalCode: "90210" },
  { name: "Fairview", region: "OR", postalCode: "97024" },
  { name: "Lakewood", region: "CO", postalCode: "80226" },
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInteger(minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function shuffle(items) {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInteger(0, index);
    [shuffledItems[index], shuffledItems[swapIndex]] = [
      shuffledItems[swapIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems;
}

export function generateShopDetails() {
  const profile = randomItem(shopProfiles);
  const city = randomItem(cities);
  const phoneExtension = randomInteger(1000, 9999);

  return {
    shop: {
      name: profile.name,
      description: profile.description,
      address: `${randomInteger(100, 999)} ${randomItem(streets)}, ${city.name}, ${city.region} ${city.postalCode}, United States`,
      contact: {
        phone: `+1 (555) 010-${String(randomInteger(0, 99)).padStart(2, "0")}`,
        email: `hello${phoneExtension}@panto.example`,
        hours: "Monday–Saturday, 9:00 AM–6:00 PM",
      },
    },
    categories: productCategories.map((name) => ({
      id: name.toLowerCase(),
      name,
    })),
    products: shuffle(products).map((product) => ({
      ...product,
      price: randomInteger(149, 1299),
      rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
    })),
  };
}
