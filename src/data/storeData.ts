import type { Product, QuickCategory } from "@/types/store";

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Electronics", href: "/category/electronics" },
  { label: "School Supplies", href: "/category/school-supplies" },
  { label: "Deals", href: "/category/deals" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const quickCategories: QuickCategory[] = [
  { id: "qc1", label: "Phone Accessories", slug: "phone-accessories", icon: "📱", mainCategory: "electronics" },
  { id: "qc2", label: "Chargers & Cables", slug: "chargers-cables", icon: "🔌", mainCategory: "electronics" },
  { id: "qc3", label: "Headphones", slug: "headphones", icon: "🎧", mainCategory: "electronics" },
  { id: "qc4", label: "Keyboards & Mouse", slug: "keyboards-mouse", icon: "⌨️", mainCategory: "electronics" },
  { id: "qc5", label: "School Bags", slug: "school-bags", icon: "🎒", mainCategory: "school-supplies" },
  { id: "qc6", label: "Notebooks", slug: "notebooks", icon: "📓", mainCategory: "school-supplies" },
  { id: "qc7", label: "Pens", slug: "pens", icon: "🖊️", mainCategory: "school-supplies" },
  { id: "qc8", label: "Calculators", slug: "calculators", icon: "🧮", mainCategory: "school-supplies" },
];

export const whyChooseNow = [
  {
    id: "w1",
    title: "Fast Local Delivery",
    description: "Same-day delivery in Amman and next-day coverage across Jordan.",
  },
  {
    id: "w2",
    title: "Trusted Product Quality",
    description: "Carefully selected electronics and study essentials from verified suppliers.",
  },
  {
    id: "w3",
    title: "Real Support, 7 Days",
    description: "Jordan-based support team ready to help with orders, returns, and product advice.",
  },
];

export const trustSignals = [
  { id: "t1", label: "4.8/5 Customer Rating", detail: "Based on verified local orders" },
  { id: "t2", label: "Secure Checkout", detail: "Card and cash-on-delivery support" },
  { id: "t3", label: "7-Day Return Window", detail: "For eligible electronics and accessories" },
  { id: "t4", label: "Jordan Support Team", detail: "Arabic and English support, 9 AM - 9 PM" },
];

export const essentialBundles = [
  {
    id: "b1",
    title: "University Starter Bundle",
    description: "Laptop sleeve, wireless mouse, notebook set, and gel pens.",
    cta: "Build my bundle",
    href: "/category/school-supplies?sub=notebooks",
  },
  {
    id: "b2",
    title: "Work Desk Essentials",
    description: "Silent keyboard and mouse combo, braided cable, and fast charger.",
    cta: "Shop desk setup",
    href: "/category/electronics?sub=keyboards-mouse",
  },
];

export const localServiceHighlights = [
  "Order before 3:00 PM for same-day delivery inside Amman.",
  "Next-day delivery to Zarqa, Irbid, Salt, and Aqaba.",
  "Live order support on WhatsApp: +962 79 900 4412.",
];

export const products: Product[] = [
  {
    id: "p1",
    title: "Anker 65W USB-C Fast Charger",
    description: "Compact GaN charger for phone, tablet, and laptop with smart power distribution.",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=900&q=80",
    category: "electronics",
    subcategory: "chargers-cables",
    rating: 4.8,
    reviews: 421,
    price: 29.0,
    oldPrice: 39.0,
    discount: 26,
    inStock: true,
    fastDelivery: true,
    featured: true,
    deal: true,
  },
  {
    id: "p2",
    title: "Logitech MK295 Silent Keyboard + Mouse",
    description: "Quiet wireless combo ideal for office and study desks.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=80",
    category: "electronics",
    subcategory: "keyboards-mouse",
    rating: 4.6,
    reviews: 306,
    price: 44.0,
    oldPrice: 55.0,
    discount: 20,
    inStock: true,
    fastDelivery: true,
    featured: true,
  },
  {
    id: "p3",
    title: "Sony WH-CH520 Wireless Headphones",
    description: "Clear sound, long battery life, and lightweight comfort for everyday use.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&q=80",
    category: "electronics",
    subcategory: "headphones",
    rating: 4.7,
    reviews: 515,
    price: 59.0,
    oldPrice: 74.0,
    discount: 20,
    inStock: true,
    fastDelivery: false,
    featured: true,
    deal: true,
  },
  {
    id: "p4",
    title: "UGREEN Braided USB-C Cable 2m",
    description: "Durable high-speed charging cable with reinforced connectors.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&q=80",
    category: "electronics",
    subcategory: "chargers-cables",
    rating: 4.5,
    reviews: 229,
    price: 8.5,
    oldPrice: 12.0,
    discount: 29,
    inStock: true,
    fastDelivery: true,
    deal: true,
  },
  {
    id: "p5",
    title: "MagSafe Compatible Phone Grip Stand",
    description: "Secure magnetic grip with built-in stand for video calls and streaming.",
    image: "https://images.unsplash.com/photo-1512499617640-c2f999098c01?w=900&q=80",
    category: "electronics",
    subcategory: "phone-accessories",
    rating: 4.4,
    reviews: 168,
    price: 14.0,
    oldPrice: 19.0,
    discount: 26,
    inStock: true,
    fastDelivery: false,
    featured: true,
  },
  {
    id: "p6",
    title: "Dell 15.6-inch Laptop Sleeve",
    description: "Water-resistant padded sleeve for daily commute and campus use.",
    image: "https://images.unsplash.com/photo-1525971977907-20d22da82d6d?w=900&q=80",
    category: "electronics",
    subcategory: "laptop-accessories",
    rating: 4.3,
    reviews: 141,
    price: 19.0,
    inStock: true,
    fastDelivery: true,
  },
  {
    id: "p7",
    title: "Classic A4 Hardcover Notebook Set (5 pcs)",
    description: "Premium paper, durable covers, ideal for school and university notes.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80",
    category: "school-supplies",
    subcategory: "notebooks",
    rating: 4.8,
    reviews: 263,
    price: 12.0,
    oldPrice: 16.0,
    discount: 25,
    inStock: true,
    fastDelivery: true,
    backToSchool: true,
    featured: true,
  },
  {
    id: "p8",
    title: "Pilot G2 Smooth Gel Pens (10 pack)",
    description: "Quick-dry gel ink with smooth writing flow and comfortable grip.",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=900&q=80",
    category: "school-supplies",
    subcategory: "pens",
    rating: 4.7,
    reviews: 194,
    price: 9.0,
    oldPrice: 12.0,
    discount: 25,
    inStock: true,
    fastDelivery: true,
    backToSchool: true,
  },
  {
    id: "p9",
    title: "Casio FX-991ES Plus Calculator",
    description: "Scientific calculator for high school and university engineering courses.",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=900&q=80",
    category: "school-supplies",
    subcategory: "calculators",
    rating: 4.9,
    reviews: 357,
    price: 24.0,
    oldPrice: 29.0,
    discount: 17,
    inStock: true,
    fastDelivery: true,
    backToSchool: true,
    featured: true,
  },
  {
    id: "p10",
    title: "Adidas Campus School Backpack",
    description: "Organized compartments and padded straps for books and laptop carry.",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=900&q=80",
    category: "school-supplies",
    subcategory: "school-bags",
    rating: 4.6,
    reviews: 208,
    price: 34.0,
    oldPrice: 45.0,
    discount: 24,
    inStock: true,
    fastDelivery: false,
    backToSchool: true,
  },
  {
    id: "p11",
    title: "Oxford Exam Prep Ring Binder",
    description: "Strong ring mechanism with divider tabs for organized subject notes.",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=900&q=80",
    category: "school-supplies",
    subcategory: "stationery",
    rating: 4.3,
    reviews: 89,
    price: 6.0,
    inStock: true,
    fastDelivery: true,
    backToSchool: true,
  },
  {
    id: "p12",
    title: "Mechanical Pencil Set + Lead Refills",
    description: "Precise writing and drafting set for students, designers, and engineers.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900&q=80",
    category: "school-supplies",
    subcategory: "pens",
    rating: 4.4,
    reviews: 122,
    price: 7.5,
    oldPrice: 10.0,
    discount: 25,
    inStock: false,
    fastDelivery: false,
    backToSchool: true,
    deal: true,
  },
];

export const featuredProducts = products.filter((product) => product.featured).slice(0, 8);
export const dealProducts = products.filter((product) => product.deal).slice(0, 8);
export const backToSchoolProducts = products.filter((product) => product.backToSchool).slice(0, 8);

export const categoryLabels: Record<string, string> = {
  electronics: "Electronics",
  "school-supplies": "School Supplies",
  deals: "Deals",
  all: "All Products",
};

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

const searchSynonyms: Record<string, string[]> = {
  school: ["student", "study", "class", "campus", "supplies", "stationery"],
  stuff: ["items", "essentials", "supplies", "stationery", "gear"],
  supplies: ["stationery", "school", "study"],
  stationery: ["supplies", "notebook", "pens", "pencil"],
  charger: ["charging", "usb", "cable", "adapter", "power"],
  cable: ["wire", "charger", "usb", "cord"],
  headphones: ["headphone", "earphones", "audio", "headset"],
  keyboard: ["keys", "typing", "mouse"],
  mouse: ["wireless", "pointer", "keyboard"],
  laptop: ["notebook", "computer", "sleeve"],
  phone: ["mobile", "magsafe", "smartphone"],
  bag: ["backpack", "school-bag", "carry"],
  bags: ["bag", "backpack"],
  pen: ["pens", "pencil", "writing"],
  pens: ["pen", "pencil", "writing"],
  notebook: ["notebooks", "notes", "paper"],
  notebooks: ["notebook", "notes", "paper"],
  calculator: ["calculators", "math", "scientific"],
  calculators: ["calculator", "math", "scientific"],
};

function normalizeSearchText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenizeSearchQuery(query: string): string[] {
  return normalizeSearchText(query).split(" ").filter(Boolean);
}

function getProductSearchText(product: Product): string {
  const categoryLabel = categoryLabels[product.category] ?? product.category.replace(/-/g, " ");
  const quickLabel = quickCategories.find((item) => item.slug === product.subcategory)?.label;
  const subcategoryLabel = quickLabel ?? product.subcategory.replace(/-/g, " ");

  return [
    product.title,
    product.description,
    categoryLabel,
    subcategoryLabel,
    product.subcategory.replace(/-/g, " "),
    product.fastDelivery ? "fast delivery local" : "standard delivery",
    product.inStock ? "in stock available" : "out of stock",
  ].join(" ");
}

function tokenMatchesHaystack(token: string, haystack: string): boolean {
  const terms = [token, ...(searchSynonyms[token] ?? [])];
  return terms.some((term) => haystack.includes(term));
}

export function matchesProductSearch(product: Product, query: string): boolean {
  const tokens = tokenizeSearchQuery(query);
  if (tokens.length === 0) {
    return true;
  }

  const haystack = normalizeSearchText(getProductSearchText(product));
  if (haystack.includes(normalizeSearchText(query))) {
    return true;
  }

  return tokens.every((token) => tokenMatchesHaystack(token, haystack));
}

export function formatPrice(value: number): string {
  return `${value.toFixed(2)} JD`;
}
