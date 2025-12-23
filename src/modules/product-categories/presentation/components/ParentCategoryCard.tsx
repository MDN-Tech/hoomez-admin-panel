import { useState } from "react";
import { ChevronDown, Plus, Layers, Edit, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { ProductCategoryTree } from "../../domain/entities/category_entity";
import { ChildCategoryCard } from "./ChildCategoryCard";
import { AddCategoryDialog } from "./AddCategoryDialog";

interface ParentCategoryCardProps {
  categoryTree: ProductCategoryTree;
}

export function ParentCategoryCard({ categoryTree }: ParentCategoryCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg">
              <FolderTree className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl">
                {categoryTree.parentCategory.name}
              </CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">
                {categoryTree.children.length} subcategories
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AddCategoryDialog
              parentCategoryId={categoryTree.parentCategory.id}
              trigger={
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Subcategory
                </Button>
              }
            />
            <Button variant="ghost" size="icon">
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
                {isOpen ? "Hide" : "Show"} Subcategories
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
                  No subcategories yet
                </p>
                <AddCategoryDialog
                  parentCategoryId={categoryTree.parentCategory.id}
                  trigger={
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus className="h-3 w-3" />
                      Add First Subcategory
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
