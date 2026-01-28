import CategoriesPageInner from "../components/CategoriesPageInner";
import { CategoryProvider } from "../contexts/CategoryProvider";

function RealEstateCategoriesPage() {
  return (
    <CategoryProvider
      categoryType={{
        moduleType: "real-estate",
        moduleName: "Real Estate Categories",
        categoryLabel: "Category",
        subcategoryLabel: "Subcategory",
      }}
    >
      <CategoriesPageInner />
    </CategoryProvider>
  );
}

export default RealEstateCategoriesPage;
