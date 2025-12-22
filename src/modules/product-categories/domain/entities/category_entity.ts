export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductCategoryTree {
  parentCategory: ProductCategory;
  children: ProductCategory[];
}

export function toJson(category: ProductCategory) {
  return { id: category.id, name: category.name };
}

export interface ProductCategoryAttribute {
  id: string;
  name: string;
  dataType: string;
}
