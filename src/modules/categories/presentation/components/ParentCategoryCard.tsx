import { useState } from "react";
import { ChevronDown, Plus, Layers, Edit, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { CategoryTree } from "../../domain/entities/category_entity";
import { ChildCategoryCard } from "./ChildCategoryCard";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { InlineEdit } from "./InlineEdit";
import { toast } from "sonner";
import { useCategoryContext } from "../hooks/useCategoryContext";
import { getError } from "@/core/helpers/error_messages";

interface ParentCategoryCardProps {
  categoryTree: CategoryTree;
}

export function ParentCategoryCard({ categoryTree }: ParentCategoryCardProps) {
  const { isService, subcategoryLabel } = useCategoryContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory({
    isService,
  });

  const handleUpdateCategoryName = (newName: string) => {
    updateCategory(
      {
        id: categoryTree.parentCategory.id,
        params: { name: newName },
      },
      {
        onSuccess: () => {
          toast.success("Category name updated");
          setIsEditMode(false);
        },
        onError: (error) => {
          toast.error(getError(error).message || "Failed to update category");
        },
      },
    );
  };

  return (
    <Card
      className={`transition-all ${
        isEditMode
          ? "border-primary/50 ring-primary/20 shadow-md ring-2"
          : "hover:shadow-sm"
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <FolderTree className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              {isEditMode ? (
                <InlineEdit
                  value={categoryTree.parentCategory.name}
                  onSave={handleUpdateCategoryName}
                  isLoading={isUpdating}
                  className="w-full"
                  inputClassName="text-xl font-bold"
                />
              ) : (
                <CardTitle className="truncate text-xl">
                  {categoryTree.parentCategory.name}
                </CardTitle>
              )}
              <p className="text-muted-foreground mt-1 text-sm">
                {categoryTree.children.length} {subcategoryLabel.toLowerCase()}s
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AddCategoryDialog
              parentCategoryId={categoryTree.parentCategory.id}
              trigger={
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add {subcategoryLabel}
                </Button>
              }
            />
            <Button
              variant={isEditMode ? "default" : "ghost"}
              size="icon"
              onClick={() => setIsEditMode(!isEditMode)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between font-medium"
            >
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                {isOpen ? "Hide" : "Show"} {subcategoryLabel}s
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            {categoryTree.children.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {categoryTree.children.map((childCategory) => (
                  <ChildCategoryCard
                    key={childCategory.id}
                    category={childCategory}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed py-8 text-center">
                <p className="text-muted-foreground mb-3 text-sm">
                  No {subcategoryLabel.toLowerCase()}s yet
                </p>
                <AddCategoryDialog
                  parentCategoryId={categoryTree.parentCategory.id}
                  trigger={
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus className="h-3 w-3" />
                      Add First {subcategoryLabel}
                    </Button>
                  }
                />
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
