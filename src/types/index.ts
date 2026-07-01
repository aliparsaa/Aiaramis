export interface Product {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
  specifications: Record<string, string>;
  features: string[];
  hospitalUsage: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  productCount: number;
  subcategories: Subcategory[];
}

export interface Subcategory {
  name: string;
  slug: string;
  productCount: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  faq: FAQ[];
  date: string;
  author: string;
  category: string;
  categorySlug: string;
  image: string;
  tags: string[];
  relatedProducts?: string[];
  readTime: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RouteInfo {
  page: string;
  slug?: string;
  categorySlug?: string;
  query?: string;
}

export interface LeadEmail {
  email: string;
  source: string;
  date: string;
}