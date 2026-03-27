// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: "sale" | "new" | "bestseller" | "limited";
  discount?: number;
  freeDelivery?: boolean;
  expressDelivery?: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  href: string;
}

// Banner Types
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaHref?: string;
  bgColor: string;
  textColor: string;
}

// Flash Deal Types
export interface FlashDeal {
  id: string;
  product: Product;
  endTime: Date;
  soldCount: number;
  totalStock: number;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}

// Promo Section Types
export interface PromoCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
  href: string;
}
