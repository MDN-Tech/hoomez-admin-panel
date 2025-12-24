import type {
  Category,
  CategoryTree,
} from "../../domain/entities/category_entity";

export interface CategoryTreeResponse {
  id: string;
  name: string;
  children: Category[];
}

export function fromJsonToTree(data: CategoryTreeResponse): CategoryTree {
  return {
    parentCategory: { id: data.id, name: data.name },
    children: data.children,
  };
}
