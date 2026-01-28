import CategoriesPageInner from "../components/CategoriesPageInner";
import { CategoryProvider } from "../contexts/CategoryProvider";

function ProductCategoriesPage() {
  return (
    <CategoryProvider
      categoryType={{
        moduleType: "product",
        moduleName: "Product Categories",
        categoryLabel: "Category",
        subcategoryLabel: "Subcategory",
      }}
    >
      <CategoriesPageInner />
    </CategoryProvider>
  );
}

export default ProductCategoriesPage;
