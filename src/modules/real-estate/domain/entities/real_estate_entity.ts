import type {
  Category,
  CategoryAttribute,
} from "@/modules/categories/domain/entities/category_entity";

export const REAL_ESTATE_STATUSES = ["active", "expired", "sold"] as const;
export type RealEstateStatus = (typeof REAL_ESTATE_STATUSES)[number];

export interface RealEstate {
  id: string;
  name: string;
  description?: string;
  noOfViews: number;
  country: string;
  city: string;
  address: string;
  price: number;
  status: RealEstateStatus;
  expiryDate: string;
  images?: RealEstateImage[];
  category: Category;
  attributes?: CategoryAttribute[];
  tags?: RealEstateTag[];
}

export interface RealEstateImage {
  id: string;
  url: string;
  isDefault: boolean;
}

export interface RealEstateTag {
  id: string;
  value: string;
}
