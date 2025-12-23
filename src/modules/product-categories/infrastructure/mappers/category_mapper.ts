import type {
  ProductCategory,
  ProductCategoryTree,
} from "../../domain/entities/category_entity";

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
