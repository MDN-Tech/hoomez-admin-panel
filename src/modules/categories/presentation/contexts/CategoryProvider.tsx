import type { ReactNode } from "react";
import { CategoryContext, type CategoryContextType } from "./CategoryContext";

export function CategoryProvider({
  isService,
  children,
}: {
  isService: boolean;
  children: ReactNode;
}) {
  const value: CategoryContextType = {
    isService,
    moduleName: isService ? "Service Categories" : "Product Categories",
    categoryLabel: isService ? "Service Category" : "Product Category",
    subcategoryLabel: isService ? "Sub-service" : "Subcategory",
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}
