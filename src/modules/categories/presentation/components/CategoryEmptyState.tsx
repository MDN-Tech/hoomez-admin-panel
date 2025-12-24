import { FolderTree } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { useCategoryContext } from "../hooks/useCategoryContext";

export function CategoryEmptyState() {
  const { moduleName } = useCategoryContext();

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <FolderTree className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="mb-2 text-lg font-semibold">
          No {moduleName.toLowerCase()} yet
        </h3>
        <p className="text-muted-foreground mb-4 max-w-75 text-center text-sm">
          Get started by creating your first{" "}
          {moduleName.toLowerCase().slice(0, -1)}
        </p>
        <AddCategoryDialog />
      </CardContent>
    </Card>
  );
}
