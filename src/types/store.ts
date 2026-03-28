export type MainCategory = "electronics" | "school-supplies";

export interface QuickCategory {
  id: string;
  label: string;
  slug: string;
  icon: string;
  mainCategory: MainCategory;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: MainCategory;
  subcategory: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice?: number;
  discount?: number;
  inStock: boolean;
  fastDelivery: boolean;
  featured?: boolean;
  deal?: boolean;
  backToSchool?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
