import { useState } from "react";
import {
  ChevronDown,
  Plus,
  Tag,
  Layers,
  Edit,
  Type,
  Hash,
  Calendar,
  ToggleLeft,
  FolderTree,
} from "lucide-react";
import { useGetCategories } from "../hooks/useGetCategories";
import { useGetAttributesByCategory } from "../hooks/useGetAttributesByCategory";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type {
  ProductAttributeDataType,
  ProductCategory,
  ProductCategoryTree,
} from "../../domain/entities/category_entity";

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

      {categoryTrees?.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FolderTree className="text-muted-foreground mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">No categories yet</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Get started by creating your first product category
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Category
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ParentCategoryCard({
  categoryTree,
}: {
  categoryTree: ProductCategoryTree;
}) {
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
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Subcategory
            </Button>
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
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-3 w-3" />
                  Add First Subcategory
                </Button>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

function ChildCategoryCard({ category }: { category: ProductCategory }) {
  const { data: attributes, isLoading: isLoadingAttributes } =
    useGetAttributesByCategory(category.id);

  const getDataTypeIcon = (dataType: ProductAttributeDataType) => {
    switch (dataType) {
      case "string":
        return <Type className="h-3 w-3" />;
      case "number":
        return <Hash className="h-3 w-3" />;
      case "date":
        return <Calendar className="h-3 w-3" />;
      case "boolean":
        return <ToggleLeft className="h-3 w-3" />;
      default:
        return <Type className="h-3 w-3" />;
    }
  };

  const getDataTypeColor = (dataType: ProductAttributeDataType) => {
    switch (dataType) {
      case "string":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "number":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
      case "date":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      case "boolean":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
              <Tag className="text-muted-foreground h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base">{category.name}</CardTitle>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {attributes?.length || 0} attributes
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Edit className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="attributes" className="border-none">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              <div className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5" />
                Attributes
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {isLoadingAttributes ? (
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-7 w-full" />
                  <Skeleton className="h-7 w-full" />
                </div>
              ) : attributes && attributes.length > 0 ? (
                <div className="space-y-2 pt-2">
                  {attributes.map((attr) => (
                    <div
                      key={attr.id}
                      className="bg-card flex items-center justify-between rounded-md border px-2.5 py-1.5 text-sm"
                    >
                      <span className="text-sm font-medium">{attr.name}</span>
                      <Badge
                        variant="outline"
                        className={`gap-1 text-xs ${getDataTypeColor(attr.dataType)}`}
                      >
                        {getDataTypeIcon(attr.dataType)}
                        {attr.dataType}
                      </Badge>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 h-8 w-full gap-2 text-xs"
                  >
                    <Plus className="h-3 w-3" />
                    Add Attribute
                  </Button>
                </div>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-muted-foreground mb-2 text-xs">
                    No attributes defined
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-2 text-xs"
                  >
                    <Plus className="h-3 w-3" />
                    Add Attribute
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

function CategoriesPageSkeleton() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-62.5" />
          <Skeleton className="h-4 w-87.5" />
        </div>
        <Skeleton className="h-10 w-45" />
      </div>
      <div className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-37.5" />
                      <Skeleton className="h-4 w-25" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-35" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default ProductCategoriesPage;
