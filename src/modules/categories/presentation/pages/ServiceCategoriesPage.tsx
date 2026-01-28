import CategoriesPageInner from "../components/CategoriesPageInner";
import { CategoryProvider } from "../contexts/CategoryProvider";

function ServiceCategoriesPage() {
  return (
    <CategoryProvider
      categoryType={{
        moduleType: "service",
        moduleName: "Service Categories",
        categoryLabel: "Category",
        subcategoryLabel: "Subcategory",
      }}
    >
      <CategoriesPageInner />
    </CategoryProvider>
  );
}

export default ServiceCategoriesPage;
