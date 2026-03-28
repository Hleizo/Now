import type {
  Product,
  Category,
  QuickCategory,
  ShopCategory,
  Banner,
  PromoBanner,
  TrustBadge,
} from "@/types";

// =============================================================================
// NAVIGATION CATEGORIES
// =============================================================================

export const navCategories: Category[] = [
  { id: "1", name: "Electronics", icon: "📱", color: "#E0F2FE", href: "/electronics" },
  { id: "2", name: "Fashion", icon: "👕", color: "#FCE7F3", href: "/fashion" },
  { id: "3", name: "Home", icon: "🏠", color: "#FEF3C7", href: "/home" },
  { id: "4", name: "Beauty", icon: "💄", color: "#F3E8FF", href: "/beauty" },
  { id: "5", name: "Sports", icon: "⚽", color: "#D1FAE5", href: "/sports" },
  { id: "6", name: "Toys", icon: "🧸", color: "#FFEDD5", href: "/toys" },
  { id: "7", name: "Books", icon: "📚", color: "#E0E7FF", href: "/books" },
  { id: "8", name: "Grocery", icon: "🛒", color: "#ECFCCB", href: "/grocery" },
  { id: "9", name: "Baby", icon: "👶", color: "#FDF2F8", href: "/baby" },
  { id: "10", name: "Appliances", icon: "🔌", color: "#F1F5F9", href: "/appliances" },
];

// =============================================================================
// QUICK CATEGORY SHORTCUTS (Circular icons)
// =============================================================================

export const quickCategories: QuickCategory[] = [
  { id: "1", name: "Mobiles", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80", href: "/mobiles" },
  { id: "2", name: "Laptops", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80", href: "/laptops" },
  { id: "3", name: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80", href: "/headphones" },
  { id: "4", name: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80", href: "/watches" },
  { id: "5", name: "Cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80", href: "/cameras" },
  { id: "6", name: "Gaming", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=200&q=80", href: "/gaming" },
  { id: "7", name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80", href: "/beauty" },
  { id: "8", name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&q=80", href: "/fashion" },
  { id: "9", name: "Home", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=80", href: "/home" },
  { id: "10", name: "Sports", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&q=80", href: "/sports" },
];

// =============================================================================
// SHOP BY CATEGORY GRID
// =============================================================================

export const shopCategories: ShopCategory[] = [
  { id: "1", name: "Electronics", tagline: "Latest Gadgets", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80", href: "/electronics", gradient: "from-navy-500 to-navy-600" },
  { id: "2", name: "Stationery", tagline: "Office Essentials", image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&q=80", href: "/stationery", gradient: "from-action-500 to-action-600" },
  { id: "3", name: "Accessories", tagline: "Complete Your Look", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80", href: "/accessories", gradient: "from-navy-400 to-navy-500" },
  { id: "4", name: "Home & Living", tagline: "Cozy Comfort", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", href: "/home", gradient: "from-action-600 to-action-700" },
  { id: "5", name: "Fashion", tagline: "Trending Styles", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80", href: "/fashion", gradient: "from-navy-500 to-action-600" },
  { id: "6", name: "Sports", tagline: "Stay Active", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80", href: "/sports", gradient: "from-navy-600 to-navy-700" },
];

// =============================================================================
// HERO BANNERS
// =============================================================================

export const heroBanners: Banner[] = [
  {
    id: "1",
    title: "Mega Sale Week",
    subtitle: "Up to 70% off on electronics",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    ctaText: "Shop Now",
    ctaHref: "/sale",
    badgeText: "HOT DEAL",
  },
  {
    id: "2",
    title: "New Arrivals",
    subtitle: "Fresh styles for the season",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    ctaText: "Explore",
    ctaHref: "/new",
    badgeText: "NEW",
  },
  {
    id: "3",
    title: "Free Delivery",
    subtitle: "On orders over 20 JD",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    ctaText: "Learn More",
    ctaHref: "/delivery",
    badgeText: "FREE SHIPPING",
  },
];

export const promoBanners: PromoBanner[] = [
  { id: "1", title: "Electronics Week", badgeText: "UP TO 50% OFF", badgeVariant: "deal", image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80", href: "/electronics" },
  { id: "2", title: "Fashion Trends", badgeText: "NEW ARRIVALS", badgeVariant: "new", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", href: "/fashion" },
];

// =============================================================================
// PRODUCTS
// =============================================================================

export const products: Product[] = [
  { id: "1", name: "Wireless Bluetooth Earbuds Pro", price: 49.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", rating: 4.5, reviewCount: 2341, badge: "bestseller", discount: 38, freeDelivery: true, inStock: true },
  { id: "2", name: "Smart Watch Series 5", price: 199.99, originalPrice: 299.99, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80", rating: 4.8, reviewCount: 1892, badge: "sale", discount: 33, expressDelivery: true, inStock: true },
  { id: "3", name: "Premium Leather Wallet", price: 34.99, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80", rating: 4.3, reviewCount: 567, badge: "new", freeDelivery: true, inStock: true },
  { id: "4", name: "Portable Power Bank 20000mAh", price: 29.99, originalPrice: 44.99, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80", rating: 4.6, reviewCount: 3421, discount: 33, freeDelivery: true, inStock: true },
  { id: "5", name: "Noise Cancelling Headphones", price: 149.99, originalPrice: 199.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", rating: 4.7, reviewCount: 2156, badge: "bestseller", discount: 25, expressDelivery: true, inStock: true },
  { id: "6", name: "Minimalist Backpack", price: 59.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80", rating: 4.4, reviewCount: 892, badge: "new", freeDelivery: true, inStock: true },
  { id: "7", name: "Wireless Charging Pad", price: 24.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400&q=80", rating: 4.2, reviewCount: 1245, discount: 38, inStock: true },
  { id: "8", name: "Fitness Tracker Band", price: 39.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80", rating: 4.5, reviewCount: 2890, badge: "sale", discount: 33, freeDelivery: true, inStock: true },
];

export const recommendedProducts: Product[] = [
  { id: "r1", name: "Stainless Steel Water Bottle", price: 24.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80", rating: 4.6, reviewCount: 1892, badge: "bestseller", freeDelivery: true, inStock: true },
  { id: "r2", name: "Yoga Mat Premium Eco", price: 39.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80", rating: 4.5, reviewCount: 723, discount: 33, inStock: true },
  { id: "r3", name: "LED Desk Lamp Touch Control", price: 32.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80", rating: 4.4, reviewCount: 445, discount: 34, freeDelivery: true, inStock: true },
  { id: "r4", name: "Wireless Mouse Ergonomic", price: 27.99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80", rating: 4.3, reviewCount: 1567, badge: "new", expressDelivery: true, inStock: true },
  { id: "r5", name: "Phone Case Transparent", price: 14.99, originalPrice: 24.99, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80", rating: 4.2, reviewCount: 3421, discount: 40, inStock: true },
  { id: "r6", name: "Laptop Sleeve 15 inch", price: 29.99, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80", rating: 4.7, reviewCount: 892, badge: "bestseller", freeDelivery: true, inStock: true },
];

// =============================================================================
// TRUST BADGES
// =============================================================================

export const trustBadges: TrustBadge[] = [
  { id: "1", icon: "🚚", title: "Free Delivery", description: "On orders over 20 JD", colorClass: "bg-action-500", bgClass: "from-blue-50 to-white", borderClass: "border-blue-100" },
  { id: "2", icon: "↩️", title: "Easy Returns", description: "30-day return policy", colorClass: "bg-emerald-500", bgClass: "from-emerald-50 to-white", borderClass: "border-emerald-100" },
  { id: "3", icon: "🔒", title: "Secure Payment", description: "100% secure checkout", colorClass: "bg-purple-500", bgClass: "from-purple-50 to-white", borderClass: "border-purple-100" },
  { id: "4", icon: "💬", title: "24/7 Support", description: "Here to help always", colorClass: "bg-amber-500", bgClass: "from-amber-50 to-white", borderClass: "border-amber-100" },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/** Get products with active discounts */
export const getDealProducts = (): Product[] => 
  products.filter(p => p.discount).map(p => ({ ...p, badge: "sale" as const }));

/** Get top rated products sorted by rating */
export const getTopRatedProducts = (limit = 8): Product[] => 
  [...products].sort((a, b) => b.rating - a.rating).slice(0, limit);

/** Format price with currency */
export const formatPrice = (price: number, currency = "JD"): string => 
  `${price.toFixed(2)} ${currency}`;

/** Calculate savings amount */
export const calculateSavings = (price: number, originalPrice?: number): number | null => 
  originalPrice ? Number((originalPrice - price).toFixed(2)) : null;
