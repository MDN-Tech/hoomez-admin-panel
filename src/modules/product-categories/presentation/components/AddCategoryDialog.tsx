import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { toast } from "sonner";

interface AddCategoryDialogProps {
  parentCategoryId?: string;
  trigger?: React.ReactNode;
}

export function AddCategoryDialog({
  parentCategoryId,
  trigger,
}: AddCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const { mutate: createCategory, isPending } = useCreateCategory();

  const isParentCategory = !parentCategoryId;
  const categoryType = isParentCategory ? "Parent Category" : "Subcategory";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    createCategory(
      {
        name: name.trim(),
        ...(parentCategoryId && { parentCategoryId }),
      },
      {
        onSuccess: () => {
          toast.success(`${categoryType} created successfully`);
          setName("");
          setOpen(false);
        },
        onError: (error) => {
          toast.error(
            error.message || `Failed to create ${categoryType.toLowerCase()}`,
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add {categoryType}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add {categoryType}</DialogTitle>
            <DialogDescription>
              {isParentCategory
                ? "Create a new parent category to organize your products."
                : "Create a new subcategory under this parent category."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder={
                  isParentCategory
                    ? "e.g., Electronics, Clothing, Furniture"
                    : "e.g., Laptops, Smartphones, Tablets"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : `Create ${categoryType}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
