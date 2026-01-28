import { createContext } from "react";
import type { CategoryModuleType } from "../../domain/entities/category_entity";

export interface CategoryContextType {
  moduleType: CategoryModuleType;
  moduleName: string; // e.g., "Product Categories" or "Service Categories"
  categoryLabel: string; // e.g., "Category" or "Service"
  subcategoryLabel: string; // e.g., "Subcategory" or "Sub-service"
}

export const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);
