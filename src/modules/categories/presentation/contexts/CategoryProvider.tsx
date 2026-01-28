import type { ReactNode } from "react";
import { CategoryContext, type CategoryContextType } from "./CategoryContext";

export function CategoryProvider({
  categoryType,
  children,
}: {
  categoryType: CategoryContextType;
  children: ReactNode;
}) {
  return (
    <CategoryContext.Provider value={categoryType}>
      {children}
    </CategoryContext.Provider>
  );
}
