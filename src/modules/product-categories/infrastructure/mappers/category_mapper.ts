import type { ProductCategoryAttribute } from "../../domain/entities/category_entity";
import type {
  ProductCategory,
  ProductCategoryTree,
} from "../../domain/entities/category_entity";

export interface CategoryAttribuesResponse {
  categoryId: string;
  attributes: ProductCategoryAttribute[];
}

export interface CategoryTreeResponse {
  id: string;
  name: string;
  children: ProductCategory[];
}

export function fromJsonToTree(
  data: CategoryTreeResponse,
): ProductCategoryTree {
  return {
    parentCategory: { id: data.id, name: data.name },
    children: data.children,
  };
}
