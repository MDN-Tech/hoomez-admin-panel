import { Plus } from "lucide-react";
import { useGetCategories } from "../hooks/useGetCategories";
import { Button } from "@/components/ui/button";
import { ParentCategoryCard } from "../components/ParentCategoryCard";
import { CategoriesPageSkeleton } from "../components/CategoriesPageSkeleton";
import { CategoryEmptyState } from "../components/CategoryEmptyState";

function ProductCategoriesPage() {
  const { data: categoryTrees, isLoading } = useGetCategories();

  if (isLoading) {
    return <CategoriesPageSkeleton />;
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Product Categories
          </h2>
          <p className="text-muted-foreground">
            Manage your product categories and their attributes
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Parent Category
        </Button>
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

export default ProductCategoriesPage;
