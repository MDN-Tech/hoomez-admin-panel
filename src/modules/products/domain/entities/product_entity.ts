import type {
  Category,
  CategoryAttribute,
} from "@/modules/categories/domain/entities/category_entity";

export interface Product {
  id: string;
  name: string;
  category: Category;
  barcode?: string;
  description?: string;
  basePrice?: number;
  brand?: string;
  stock?: number;
  images?: ProductImage[];
  variants?: ProductVariant[];
  attributes?: CategoryAttribute[];
  tags?: ProductTag[];
  promotions?: ProductPromotion[];
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
  images?: ProductImage[];
  attributes?: CategoryAttribute[];
}

export interface ProductTag {
  id: string;
  value: string;
}

export interface ProductPromotion {
  id: string;
  name: string;
  description?: string;
  discountPercentage?: number;
  discountAmount?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
