import { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryContext";

export function useCategoryContext() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider",
    );
  }
  return context;
}
