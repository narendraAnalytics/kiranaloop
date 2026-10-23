export type Category = {
  slug: string;
  name: string;
  emoji: string;
  tint: string;
};

export type Product = {
  id: string;
  name: string;
  size: string;
  price: number;
  mrp: number;
  emoji: string;
  tint: string;
  storeId: string;
};

export type Store = {
  id: string;
  name: string;
  owner: string;
  area: string;
  distance: string;
  eta: string;
  rating: number;
  orders: string;
  known: string;
  closes: string;
  initials: string;
  tint: string;
};

export const categories: Category[] = [
  { slug: "fruits-veg", name: "Fruits & veg", emoji: "🥬", tint: "#e3f4e1" },
  { slug: "dairy-eggs", name: "Dairy & eggs", emoji: "🥛", tint: "#e4eefb" },
  { slug: "atta-rice-dal", name: "Atta, rice & dal", emoji: "🌾", tint: "#fdf0cf" },
  { slug: "masala-oil", name: "Masala & oil", emoji: "🌶️", tint: "#fde3dd" },
  { slug: "snacks", name: "Snacks", emoji: "🍪", tint: "#f8e8d6" },
  { slug: "tea-coffee", name: "Tea & coffee", emoji: "☕", tint: "#eadfd5" },
  { slug: "bakery", name: "Bread & bakery", emoji: "🍞", tint: "#fbeccf" },
  { slug: "cleaning", name: "Cleaning", emoji: "🧴", tint: "#dff3f4" },
  { slug: "personal-care", name: "Personal care", emoji: "🧼", tint: "#efe4f6" },
  { slug: "baby-pets", name: "Baby & pets", emoji: "🍼", tint: "#fce4ee" },
];

export const stores: Store[] = [
  {
    id: "sharma",
    name: "Sharma General Store",
    owner: "Ramesh Sharma",
    area: "5th Cross, Indiranagar",
    distance: "400 m",
    eta: "12 min",
    rating: 4.8,
    orders: "2,300+ orders",
    known: "Fresh dairy and daily staples",
    closes: "Open till 10:30 pm",
    initials: "SG",
    tint: "#ff9f1c",
  },
  {
    id: "gupta",
    name: "Gupta Fruit & Veg",
    owner: "Anita Gupta",
    area: "12th Main, Indiranagar",
    distance: "650 m",
    eta: "15 min",
    rating: 4.7,
    orders: "1,800+ orders",
    known: "Vegetables picked every morning",
    closes: "Open till 9 pm",
    initials: "GF",
    tint: "#7ccf8f",
  },
  {
    id: "bansal",
    name: "Bansal Provision",
    owner: "Vijay Bansal",
    area: "CMH Road, Indiranagar",
    distance: "900 m",
    eta: "18 min",
    rating: 4.9,
    orders: "3,100+ orders",
    known: "Dals, spices and dry fruit",
    closes: "Open till 10 pm",
    initials: "BP",
    tint: "#f48a7a",
  },
];

export const products: Product[] = [
  { id: "milk", name: "Full cream milk", size: "500 ml", price: 33, mrp: 34, emoji: "🥛", tint: "#e4eefb", storeId: "sharma" },
  { id: "eggs", name: "Farm eggs", size: "6 pcs", price: 54, mrp: 60, emoji: "🥚", tint: "#fdf0cf", storeId: "sharma" },
  { id: "bread", name: "Brown bread", size: "400 g", price: 45, mrp: 50, emoji: "🍞", tint: "#fbeccf", storeId: "sharma" },
  { id: "tomato", name: "Local tomato", size: "500 g", price: 22, mrp: 28, emoji: "🍅", tint: "#fde3dd", storeId: "gupta" },
  { id: "onion", name: "Onion", size: "1 kg", price: 38, mrp: 45, emoji: "🧅", tint: "#f6e6ef", storeId: "gupta" },
  { id: "banana", name: "Robusta banana", size: "6 pcs", price: 42, mrp: 48, emoji: "🍌", tint: "#fff3c4", storeId: "gupta" },
  { id: "atta", name: "Sharbati atta", size: "5 kg", price: 289, mrp: 325, emoji: "🌾", tint: "#fdf0cf", storeId: "bansal" },
  { id: "toor", name: "Toor dal", size: "1 kg", price: 165, mrp: 185, emoji: "🥜", tint: "#f8e8d6", storeId: "bansal" },
  { id: "chai", name: "Assam chai patti", size: "250 g", price: 82, mrp: 95, emoji: "🍵", tint: "#e3f4e1", storeId: "bansal" },
  { id: "paneer", name: "Fresh paneer", size: "200 g", price: 78, mrp: 85, emoji: "🧀", tint: "#fff3c4", storeId: "sharma" },
  { id: "mustard", name: "Mustard oil", size: "1 L", price: 168, mrp: 185, emoji: "🍯", tint: "#fdf0cf", storeId: "bansal" },
  { id: "biscuits", name: "Glucose biscuits", size: "300 g", price: 30, mrp: 32, emoji: "🍪", tint: "#f8e8d6", storeId: "sharma" },
];

export type ProductDetails = {
  category: string;
  description: string;
  highlights: string[];
};

const productDetails: Record<string, ProductDetails> = {
  milk: {
    category: "dairy-eggs",
    description:
      "Pasteurised full cream milk, delivered cold from the shop fridge. Good for chai, curd and the kids' glass at night.",
    highlights: ["6% fat", "Keep refrigerated", "Use within 2 days of delivery"],
  },
  eggs: {
    category: "dairy-eggs",
    description: "Brown farm eggs, checked by the shop before packing. Six to a tray.",
    highlights: ["6 eggs per tray", "Packed in a protective tray", "Best within 10 days"],
  },
  bread: {
    category: "bakery",
    description: "Soft brown bread, sliced and baked this morning at the local bakery.",
    highlights: ["400 g loaf", "Baked today", "Best within 3 days"],
  },
  tomato: {
    category: "fruits-veg",
    description: "Firm, ripe local tomatoes picked this morning. Ready for sabzi, chutney or salad.",
    highlights: ["Picked this morning", "Sold by weight, about 500 g", "Store in a cool place"],
  },
  onion: {
    category: "fruits-veg",
    description: "Dry red onions, sorted for size. A kitchen staple that keeps well.",
    highlights: ["1 kg pack", "Sorted by hand", "Lasts 3 to 4 weeks"],
  },
  banana: {
    category: "fruits-veg",
    description: "Robusta bananas, ripe and ready to eat. Six in a bunch.",
    highlights: ["6 pieces", "Ripe today", "Store at room temperature"],
  },
  atta: {
    category: "atta-rice-dal",
    description:
      "Stone-ground sharbati wheat atta that makes soft rotis. A 5 kg bag is enough for a family of four for about three weeks.",
    highlights: ["5 kg bag", "100% whole wheat", "Best within 3 months"],
  },
  toor: {
    category: "atta-rice-dal",
    description: "Polished toor dal, cleaned and sorted. Cooks evenly for everyday dal and sambar.",
    highlights: ["1 kg pack", "Cleaned and sorted", "Store in a dry jar"],
  },
  chai: {
    category: "tea-coffee",
    description: "Strong Assam chai patti with a deep colour. Makes about 100 cups.",
    highlights: ["250 g pack", "Strong, dark liquor", "Keep airtight"],
  },
  paneer: {
    category: "dairy-eggs",
    description: "Soft fresh paneer made this morning. Cut it into cubes for curries or grill it as is.",
    highlights: ["200 g block", "Made fresh daily", "Use within 2 days"],
  },
  mustard: {
    category: "masala-oil",
    description: "Cold-pressed kachi ghani mustard oil with the sharp aroma you expect in pickles and fish curry.",
    highlights: ["1 litre bottle", "Cold-pressed", "Best within 6 months"],
  },
  biscuits: {
    category: "snacks",
    description: "Crisp glucose biscuits for chai time. A packet that disappears fast.",
    highlights: ["300 g pack", "Sealed packet", "Best within 4 months"],
  },
};

export function getProductDetails(id: string): ProductDetails | undefined {
  return productDetails[id];
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const servicePincodes = ["560038", "560008", "560075", "560071", "560025"];

export const FREE_DELIVERY_ABOVE = 199;
export const DELIVERY_FEE = 25;

export const deliverySlots = [
  { id: "asap", label: "As soon as possible", detail: "12 to 18 minutes" },
  { id: "evening", label: "Today, 7 to 8 pm", detail: "Scheduled" },
  { id: "morning", label: "Tomorrow, 8 to 9 am", detail: "Scheduled" },
] as const;

export const paymentMethods = [
  { id: "upi", label: "UPI", detail: "Pay with any UPI app" },
  { id: "card", label: "Credit or debit card", detail: "Visa, Mastercard, RuPay" },
  { id: "cod", label: "Cash on delivery", detail: "Pay the rider at your door" },
] as const;

export type SlotId = (typeof deliverySlots)[number]["id"];
export type PaymentId = (typeof paymentMethods)[number]["id"];

export const usualBasket: { productId: string; qty: number }[] = [
  { productId: "milk", qty: 2 },
  { productId: "bread", qty: 1 },
  { productId: "eggs", qty: 1 },
  { productId: "tomato", qty: 1 },
  { productId: "onion", qty: 1 },
  { productId: "chai", qty: 1 },
];

const productIndex = new Map(products.map((p) => [p.id, p]));

export function getProduct(id: string): Product | undefined {
  return productIndex.get(id);
}

export function getStore(id: string): Store | undefined {
  return stores.find((s) => s.id === id);
}

export function formatPrice(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
