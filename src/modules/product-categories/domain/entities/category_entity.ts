export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductCategoryTree {
  parentCategory: ProductCategory;
  children: ProductCategory[];
}

export type ProductAttributeDataType = "string" | "number" | "boolean" | "date";

export interface ProductCategoryAttribute {
  id: string;
  name: string;
  dataType: ProductAttributeDataType;
}

export function toJson(category: ProductCategory) {
  return { id: category.id, name: category.name };
}
