import { useState } from "react";
import {
  Plus,
  Tag,
  Layers,
  Edit,
  Type,
  Hash,
  Calendar,
  ToggleLeft,
} from "lucide-react";
import { useGetAttributesByCategory } from "../hooks/useGetAttributesByCategory";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { useUpdateAttribute } from "../hooks/useUpdateAttribute";
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
import type {
  AttributeDataType,
  Category,
} from "../../domain/entities/category_entity";
import { AddAttributeDialog } from "./AddAttributeDialog";
import { InlineEdit } from "./InlineEdit";
import { toast } from "sonner";
import { useCategoryContext } from "../hooks/useCategoryContext";
import { getError } from "@/core/helpers/error_messages";

interface ChildCategoryCardProps {
  category: Category;
}

const getDataTypeIcon = (dataType: AttributeDataType) => {
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

const getDataTypeColor = (dataType: AttributeDataType) => {
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

export function ChildCategoryCard({ category }: ChildCategoryCardProps) {
  const { moduleType } = useCategoryContext();
  const [isEditMode, setIsEditMode] = useState(false);
  const { data: attributes, isLoading: isLoadingAttributes } =
    useGetAttributesByCategory({ moduleType, categoryId: category.id });
  const { mutate: updateCategory, isPending: isUpdatingCategory } =
    useUpdateCategory({ moduleType });
  const { mutate: updateAttribute, isPending: isUpdatingAttribute } =
    useUpdateAttribute({ moduleType });

  const handleUpdateCategoryName = (newName: string) => {
    updateCategory(
      {
        id: category.id,
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

  const handleUpdateAttributeName = (attributeId: string, newName: string) => {
    updateAttribute(
      {
        id: attributeId,
        params: { name: newName },
      },
      {
        onSuccess: () => {
          toast.success("Attribute name updated");
        },
        onError: (error) => {
          toast.error(getError(error).message || "Failed to update attribute");
        },
      },
    );
  };

  return (
    <Card
      className={`transition-all ${
        isEditMode
          ? "border-primary/50 ring-primary/20 shadow-md ring-2"
          : "hover:shadow-md"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
              <Tag className="text-muted-foreground h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              {isEditMode ? (
                <InlineEdit
                  value={category.name}
                  onSave={handleUpdateCategoryName}
                  isLoading={isUpdatingCategory}
                  className="w-full"
                  inputClassName="text-base font-semibold"
                />
              ) : (
                <CardTitle className="text-base">{category.name}</CardTitle>
              )}
              <p className="text-muted-foreground mt-0.5 text-xs">
                {attributes?.length || 0} attributes
              </p>
            </div>
          </div>
          <Button
            variant={isEditMode ? "default" : "ghost"}
            size="icon"
            className="h-7 w-7 shrink-0"
            onClick={() => setIsEditMode(!isEditMode)}
          >
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
                      className="bg-card flex items-center justify-between gap-2 rounded-md border px-2.5 py-1.5 text-sm"
                    >
                      {isEditMode ? (
                        <InlineEdit
                          value={attr.name}
                          onSave={(newName) =>
                            handleUpdateAttributeName(attr.id, newName)
                          }
                          isLoading={isUpdatingAttribute}
                          className="flex-1"
                          inputClassName="text-sm"
                        />
                      ) : (
                        <span className="text-sm font-medium">{attr.name}</span>
                      )}
                      <Badge
                        variant="outline"
                        className={`shrink-0 gap-1 text-xs ${getDataTypeColor(attr.dataType)}`}
                      >
                        {getDataTypeIcon(attr.dataType)}
                        {attr.dataType}
                      </Badge>
                    </div>
                  ))}
                  <AddAttributeDialog
                    categoryId={category.id}
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 h-8 w-full gap-2 text-xs"
                      >
                        <Plus className="h-3 w-3" />
                        Add Attribute
                      </Button>
                    }
                  />
                </div>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-muted-foreground mb-2 text-xs">
                    No attributes defined
                  </p>
                  <AddAttributeDialog
                    categoryId={category.id}
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-2 text-xs"
                      >
                        <Plus className="h-3 w-3" />
                        Add Attribute
                      </Button>
                    }
                  />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
