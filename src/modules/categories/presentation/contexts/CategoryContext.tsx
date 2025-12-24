import { createContext } from "react";

export interface CategoryContextType {
  isService: boolean;
  moduleName: string; // e.g., "Product Categories" or "Service Categories"
  categoryLabel: string; // e.g., "Category" or "Service"
  subcategoryLabel: string; // e.g., "Subcategory" or "Sub-service"
}

export const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined,
);
