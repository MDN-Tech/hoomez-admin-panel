import type {
  Category,
  AttributeDataType,
} from "@/modules/categories/domain/entities/category_entity";

export interface Service {
  id: string;
  name: string;
  category: Category;
  description?: string;
  basePrice?: number;
  images?: ServiceImage[];
  attributes?: ServiceAttribute[];
  packages?: ServicePackage[];
  tags?: ServiceTag[];
}

export interface ServiceImage {
  id: string;
  url: string;
}

export interface ServiceAttribute {
  id: string;
  templateId?: string;
  name: string;
  dataType: AttributeDataType;
  stringValue?: string;
  numberValue?: number;
  booleanValue?: boolean;
  dateValue?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description?: string;
  images?: ServiceImage[];
  attributes?: ServiceAttribute[];
}

export interface ServiceTag {
  id: string;
  value: string;
}
