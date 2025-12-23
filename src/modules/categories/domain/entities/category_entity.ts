export interface Category {
  id: string;
  name: string;
}

export interface CategoryTree {
  parentCategory: Category;
  children: Category[];
}

export type AttributeDataType = "string" | "number" | "boolean" | "date";

export interface CategoryAttribute {
  id: string;
  name: string;
  dataType: AttributeDataType;
}

export function toJson(category: Category) {
  return { id: category.id, name: category.name };
}
