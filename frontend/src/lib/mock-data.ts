export type Category = {
  slug: string;
  name: string;
  emoji: string;
  tint: string;
  /** Optional illustration shown instead of the emoji. */
  image?: string;
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
  /** Optional photo shown instead of the emoji on the usual-basket card. */
  image?: string;
};

export type Store = {
  id: string;
  name: string;
  /** One-word name for chips and tight labels. */
  short: string;
  owner: string;
  /** How customers address the owner, for example "Satyanarayana garu". */
  callName: string;
  area: string;
  pincode: string;
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
  { slug: "fruits-veg", name: "Fruits & veg", emoji: "🥬", tint: "#e3f4e1",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792766855/fruitsandveg_qvjghr.png" },
  { slug: "dairy-eggs", name: "Dairy & eggs", emoji: "🥛", tint: "#e4eefb",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792821133/dairy_eggs_mixv0y.png" },
  { slug: "atta-rice-dal", name: "Atta, rice & dal", emoji: "🌾", tint: "#fdf0cf",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792820904/attarice_dal_lbcmwe.png" },
  { slug: "masala-oil", name: "Masala & oil", emoji: "🌶️", tint: "#fde3dd",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792820696/masala_oil_bhgazw.png" },
  { slug: "snacks", name: "Snacks", emoji: "🍪", tint: "#f8e8d6",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792820477/snacks_wg177k.png" },
  { slug: "tea-coffee", name: "Tea & coffee", emoji: "☕", tint: "#eadfd5",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792820175/teaandCoffee_b03e4s.png" },
  { slug: "bakery", name: "Bread & bakery", emoji: "🍞", tint: "#fbeccf",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792823236/breadandbakery_wjsxra.png" },
  { slug: "cleaning", name: "Cleaning", emoji: "🧴", tint: "#dff3f4",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792823425/cleaning_rknl6v.png" },
  { slug: "personal-care", name: "Personal care", emoji: "🧼", tint: "#efe4f6",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792769988/PersonaCare_saukt6.png" },
  { slug: "baby-care", name: "Baby care", emoji: "🍼", tint: "#fce4ee",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792821481/babycare_d8wcqb.png" },
  { slug: "pets", name: "Pets", emoji: "🐶", tint: "#fdeccd",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792821603/pets_t4os7e.png" },
];

export const stores: Store[] = [
  {
    id: "lakshmi",
    name: "Sri Lakshmi General Store",
    short: "Lakshmi",
    owner: "Satyanarayana Murthy",
    callName: "Satyanarayana garu",
    area: "Gandhi Bomma Centre, Palakollu",
    pincode: "534260",
    distance: "400 m",
    eta: "12 min",
    rating: 4.8,
    orders: "2,300+ orders",
    known: "Fresh dairy and daily staples",
    closes: "Open till 10:30 pm",
    initials: "SL",
    tint: "#ff9f1c",
  },
  {
    id: "venkata",
    name: "Venkata Fruits & Veg",
    short: "Venkata",
    owner: "Padmavathi Devi",
    callName: "Padmavathi garu",
    area: "Main Road, Palakollu",
    pincode: "534260",
    distance: "650 m",
    eta: "15 min",
    rating: 4.7,
    orders: "1,800+ orders",
    known: "Vegetables picked every morning",
    closes: "Open till 9 pm",
    initials: "VF",
    tint: "#7ccf8f",
  },
  {
    id: "sairam",
    name: "Sai Ram Provisions",
    short: "Sai Ram",
    owner: "Srinivas Rao",
    callName: "Srinivas garu",
    area: "Bhaggeswaram, Palakollu",
    pincode: "534260",
    distance: "900 m",
    eta: "18 min",
    rating: 4.9,
    orders: "3,100+ orders",
    known: "Dals, spices and dry fruit",
    closes: "Open till 10 pm",
    initials: "SR",
    tint: "#f48a7a",
  },
];

export const products: Product[] = [
  { id: "milk", name: "Full cream milk", size: "500 ml", price: 33, mrp: 34, emoji: "🥛", tint: "#e4eefb", storeId: "lakshmi",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792823017/milkglass_arp4nq.png" },
  { id: "eggs", name: "Farm eggs", size: "6 pcs", price: 54, mrp: 60, emoji: "🥚", tint: "#fdf0cf", storeId: "lakshmi",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792847577/egg_jo18rf.png" },
  { id: "bread", name: "Brown bread", size: "400 g", price: 45, mrp: 50, emoji: "🍞", tint: "#fbeccf", storeId: "lakshmi",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792846675/brownbread_igphfu.png" },
  { id: "tomato", name: "Local tomato", size: "500 g", price: 22, mrp: 28, emoji: "🍅", tint: "#fde3dd", storeId: "venkata",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792847204/tomato_mgk66d.png" },
  { id: "onion", name: "Onion", size: "1 kg", price: 38, mrp: 45, emoji: "🧅", tint: "#f6e6ef", storeId: "venkata",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792847577/onion_imh0cu.png" },
  { id: "banana", name: "Robusta banana", size: "6 pcs", price: 42, mrp: 48, emoji: "🍌", tint: "#fff3c4", storeId: "venkata" },
  { id: "atta", name: "Sharbati atta", size: "5 kg", price: 289, mrp: 325, emoji: "🌾", tint: "#fdf0cf", storeId: "sairam" },
  { id: "toor", name: "Toor dal", size: "1 kg", price: 165, mrp: 185, emoji: "🥜", tint: "#f8e8d6", storeId: "sairam" },
  { id: "chai", name: "Assam chai patti", size: "250 g", price: 82, mrp: 95, emoji: "🍵", tint: "#e3f4e1", storeId: "sairam",
    image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792847677/assamteapatti_oe2dv0.png" },
  { id: "paneer", name: "Fresh paneer", size: "200 g", price: 78, mrp: 85, emoji: "🧀", tint: "#fff3c4", storeId: "lakshmi" },
  { id: "mustard", name: "Mustard oil", size: "1 L", price: 168, mrp: 185, emoji: "🍯", tint: "#fdf0cf", storeId: "sairam" },
  { id: "biscuits", name: "Glucose biscuits", size: "300 g", price: 30, mrp: 32, emoji: "🍪", tint: "#f8e8d6", storeId: "lakshmi" },
  { id: "toned-milk", name: "Toned milk", size: "500 ml", price: 28, mrp: 29, emoji: "🥛", tint: "#e4eefb", storeId: "lakshmi" },
  { id: "buffalo-milk", name: "Buffalo milk", size: "500 ml", price: 38, mrp: 42, emoji: "🐃", tint: "#e4eefb", storeId: "lakshmi" },
  { id: "desi-eggs", name: "Desi country eggs", size: "6 pcs", price: 72, mrp: 80, emoji: "🥚", tint: "#fdf0cf", storeId: "lakshmi" },
  { id: "egg-tray", name: "Farm eggs tray", size: "30 pcs", price: 210, mrp: 240, emoji: "🥚", tint: "#fdf0cf", storeId: "sairam" },
  { id: "curd", name: "Fresh curd", size: "400 g", price: 35, mrp: 38, emoji: "🥣", tint: "#eef3fb", storeId: "lakshmi" },
  { id: "buttermilk", name: "Masala buttermilk", size: "500 ml", price: 15, mrp: 15, emoji: "🥤", tint: "#e3f4e1", storeId: "lakshmi" },
  { id: "malai-paneer", name: "Malai paneer", size: "500 g", price: 185, mrp: 210, emoji: "🧀", tint: "#fff3c4", storeId: "sairam" },
  { id: "butter", name: "Salted butter", size: "100 g", price: 58, mrp: 60, emoji: "🧈", tint: "#fff3c4", storeId: "lakshmi" },
  { id: "ghee", name: "Pure cow ghee", size: "500 ml", price: 340, mrp: 375, emoji: "🍯", tint: "#fdf0cf", storeId: "sairam" },
  { id: "cheese", name: "Cheese slices", size: "200 g", price: 145, mrp: 160, emoji: "🧀", tint: "#fff3c4", storeId: "lakshmi" },
];

/** The products shown in "Popular in your neighbourhood" on the landing page. */
export const popularIds = [
  "milk", "eggs", "bread", "tomato", "onion", "banana", "atta", "toor", "chai", "paneer", "mustard", "biscuits",
];

export type Subcategory = {
  slug: string;
  name: string;
  emoji: string;
  /** Optional photo for the aisle rail, otherwise the emoji. */
  image?: string;
};

/** Shelves inside an aisle, shown as the left rail on the aisle page. Aisles without an entry show one "All" shelf. */
export const subcategories: Record<string, Subcategory[]> = {
  "dairy-eggs": [
    { slug: "milk", name: "Milk", emoji: "🥛",
      image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792823017/milkglass_arp4nq.png" },
    { slug: "eggs", name: "Eggs", emoji: "🥚",
      image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792847577/egg_jo18rf.png" },
    { slug: "curd", name: "Curd & buttermilk", emoji: "🥣" },
    { slug: "paneer", name: "Paneer", emoji: "🧊" },
    { slug: "butter-ghee", name: "Butter & ghee", emoji: "🧈" },
    { slug: "cheese", name: "Cheese", emoji: "🧀" },
  ],
  "fruits-veg": [
    { slug: "vegetables", name: "Vegetables", emoji: "🍅",
      image: "https://res.cloudinary.com/dkqbzwicr/image/upload/v1792847204/tomato_mgk66d.png" },
    { slug: "fruits", name: "Fruits", emoji: "🍌" },
  ],
  "atta-rice-dal": [
    { slug: "atta", name: "Atta", emoji: "🌾" },
    { slug: "dal", name: "Dal & pulses", emoji: "🥜" },
  ],
};

export type ProductDetails = {
  category: string;
  /** Shelf slug from `subcategories[category]`, when the aisle has shelves. */
  subcategory?: string;
  description: string;
  highlights: string[];
};

const productDetails: Record<string, ProductDetails> = {
  milk: {
    category: "dairy-eggs",
    subcategory: "milk",
    description:
      "Pasteurised full cream milk, delivered cold from the shop fridge. Good for chai, curd and the kids' glass at night.",
    highlights: ["6% fat", "Keep refrigerated", "Use within 2 days of delivery"],
  },
  eggs: {
    category: "dairy-eggs",
    subcategory: "eggs",
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
    subcategory: "vegetables",
    description: "Firm, ripe local tomatoes picked this morning. Ready for sabzi, chutney or salad.",
    highlights: ["Picked this morning", "Sold by weight, about 500 g", "Store in a cool place"],
  },
  onion: {
    category: "fruits-veg",
    subcategory: "vegetables",
    description: "Dry red onions, sorted for size. A kitchen staple that keeps well.",
    highlights: ["1 kg pack", "Sorted by hand", "Lasts 3 to 4 weeks"],
  },
  banana: {
    category: "fruits-veg",
    subcategory: "fruits",
    description: "Robusta bananas, ripe and ready to eat. Six in a bunch.",
    highlights: ["6 pieces", "Ripe today", "Store at room temperature"],
  },
  atta: {
    category: "atta-rice-dal",
    subcategory: "atta",
    description:
      "Stone-ground sharbati wheat atta that makes soft rotis. A 5 kg bag is enough for a family of four for about three weeks.",
    highlights: ["5 kg bag", "100% whole wheat", "Best within 3 months"],
  },
  toor: {
    category: "atta-rice-dal",
    subcategory: "dal",
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
    subcategory: "paneer",
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
  "toned-milk": {
    category: "dairy-eggs",
    subcategory: "milk",
    description: "Lighter toned milk for everyday chai and coffee. Delivered cold from the shop fridge.",
    highlights: ["3% fat", "Keep refrigerated", "Use within 2 days of delivery"],
  },
  "buffalo-milk": {
    category: "dairy-eggs",
    subcategory: "milk",
    description: "Thick buffalo milk from a dairy outside Palakollu. Sets firm curd and makes rich sweets.",
    highlights: ["6.5% fat", "Collected this morning", "Boil before use"],
  },
  "desi-eggs": {
    category: "dairy-eggs",
    subcategory: "eggs",
    description: "Small country hen eggs with deep yellow yolks. Six to a tray.",
    highlights: ["6 eggs per tray", "Free-range hens", "Best within 10 days"],
  },
  "egg-tray": {
    category: "dairy-eggs",
    subcategory: "eggs",
    description: "A full tray of white farm eggs for big families and weekend baking.",
    highlights: ["30 eggs", "Checked before packing", "Best within 10 days"],
  },
  curd: {
    category: "dairy-eggs",
    subcategory: "curd",
    description: "Thick curd set overnight at the shop. Good with rice, in raita or as is.",
    highlights: ["400 g cup", "Set overnight", "Use within 2 days"],
  },
  buttermilk: {
    category: "dairy-eggs",
    subcategory: "curd",
    description: "Chilled majjiga with ginger, green chilli and curry leaves. Best on a hot afternoon.",
    highlights: ["500 ml pouch", "Spiced with ginger and chilli", "Keep refrigerated"],
  },
  "malai-paneer": {
    category: "dairy-eggs",
    subcategory: "paneer",
    description: "Soft, creamy paneer in a bigger block for curries and parties.",
    highlights: ["500 g block", "Made fresh daily", "Use within 2 days"],
  },
  butter: {
    category: "dairy-eggs",
    subcategory: "butter-ghee",
    description: "Salted table butter for toast, parathas and pav bhaji.",
    highlights: ["100 g pack", "Keep refrigerated", "Best within 3 months"],
  },
  ghee: {
    category: "dairy-eggs",
    subcategory: "butter-ghee",
    description: "Pure cow ghee with a grainy texture and a strong aroma. A spoon on hot rice is enough.",
    highlights: ["500 ml jar", "Made from cow milk", "Best within 9 months"],
  },
  cheese: {
    category: "dairy-eggs",
    subcategory: "cheese",
    description: "Processed cheese slices for sandwiches and burgers. Ten slices in a pack.",
    highlights: ["200 g, 10 slices", "Keep refrigerated", "Best within 6 months"],
  },
};

export function getProductDetails(id: string): ProductDetails | undefined {
  return productDetails[id];
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Palakollu, Yelamanchili and Narasapuram, West Godavari, Andhra Pradesh. */
export const servicePincodes = ["534260", "534268", "534275"];
export const defaultPincode = "534260";
export const defaultLocation = "Palakollu, 534260";

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

/** Every product in an aisle, in catalogue order. */
export function getAisleProducts(slug: string): Product[] {
  return products.filter((p) => productDetails[p.id]?.category === slug);
}

export function getStore(id: string): Store | undefined {
  return stores.find((s) => s.id === id);
}

export function formatPrice(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
