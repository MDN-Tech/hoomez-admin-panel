import { Plus, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CategoryEmptyState() {
  return (
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
  );
}
