import { useGetCategories } from "../hooks/useGetCategories";
import { ParentCategoryCard } from "./ParentCategoryCard";
import { CategoriesPageSkeleton } from "./CategoriesPageSkeleton";
import { CategoryEmptyState } from "./CategoryEmptyState";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { useCategoryContext } from "../hooks/useCategoryContext";

function CategoriesPageLayout() {
  const { moduleType, moduleName } = useCategoryContext();
  console.log("moduleType:", moduleType);
  const { data: categoryTrees, isLoading } = useGetCategories({
    moduleType,
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

export default CategoriesPageLayout;
