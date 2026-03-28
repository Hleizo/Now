// =============================================================================
// PRODUCT TYPES
// =============================================================================

export type ProductBadge = "sale" | "new" | "bestseller" | "limited";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: ProductBadge;
  discount?: number;
  freeDelivery?: boolean;
  expressDelivery?: boolean;
  inStock?: boolean;
}

// =============================================================================
// CATEGORY TYPES
// =============================================================================

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
  color: string;
  href: string;
}

export interface QuickCategory {
  id: string;
  name: string;
  image: string;
  href: string;
}

export interface ShopCategory {
  id: string;
  name: string;
  tagline: string;
  image: string;
  href: string;
  gradient: string;
}

// =============================================================================
// BANNER TYPES
// =============================================================================

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaHref?: string;
  badgeText?: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  badgeText: string;
  badgeVariant: "deal" | "new";
  image: string;
  href: string;
}

// =============================================================================
// NAVIGATION TYPES
// =============================================================================

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: number;
  badgeVariant?: "action" | "deal";
}

// =============================================================================
// SECTION TYPES
// =============================================================================

export interface ProductSectionProps {
  products: Product[];
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  variant?: "default" | "deal";
  layout?: "grid" | "carousel";
}

export interface TrustBadge {
  id: string;
  icon: string;
  title: string;
  description: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

// =============================================================================
// API RESPONSE TYPES (for future backend integration)
// =============================================================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface ProductsResponse extends ApiResponse<Product[]> {}
export interface CategoriesResponse extends ApiResponse<Category[]> {}
export interface BannersResponse extends ApiResponse<Banner[]> {}
