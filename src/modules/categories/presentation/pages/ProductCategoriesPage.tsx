import { useGetCategories } from "../hooks/useGetCategories";
import { ParentCategoryCard } from "../components/ParentCategoryCard";
import { CategoriesPageSkeleton } from "../components/CategoriesPageSkeleton";
import { CategoryEmptyState } from "../components/CategoryEmptyState";
import { AddCategoryDialog } from "../components/AddCategoryDialog";
import { useCategoryContext } from "../hooks/useCategoryContext";
import { CategoryProvider } from "../contexts/CategoryProvider";

function CategoriesPageInner() {
  const { isService, moduleName } = useCategoryContext();
  const { data: categoryTrees, isLoading } = useGetCategories({
    isService,
  });

  if (isLoading) {
    return <CategoriesPageSkeleton />;
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{moduleName}</h2>
          <p className="text-muted-foreground">
            Manage your {moduleName.toLowerCase()} and their attributes
          </p>
        </div>
        <AddCategoryDialog />
      </div>

      <div className="space-y-4">
        {categoryTrees?.map((tree) => (
          <ParentCategoryCard
            key={tree.parentCategory.id}
            categoryTree={tree}
          />
        ))}
      </div>

      {categoryTrees?.length === 0 && <CategoryEmptyState />}
    </div>
  );
}

function ProductCategoriesPage() {
  return (
    <CategoryProvider isService={false}>
      <CategoriesPageInner />
    </CategoryProvider>
  );
}

export default ProductCategoriesPage;
