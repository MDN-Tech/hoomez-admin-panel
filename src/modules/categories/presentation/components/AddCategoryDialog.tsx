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
import { useCategoryContext } from "../hooks/useCategoryContext";
import { getError } from "@/core/helpers/error_messages";

interface AddCategoryDialogProps {
  parentCategoryId?: string;
  trigger?: React.ReactNode;
}

export function AddCategoryDialog({
  parentCategoryId,
  trigger,
}: AddCategoryDialogProps) {
  const { moduleType, categoryLabel, subcategoryLabel } = useCategoryContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const { mutate: createCategory, isPending } = useCreateCategory({
    moduleType,
  });

  const isParentCategory = !parentCategoryId;
  const itemType = isParentCategory ? categoryLabel : subcategoryLabel;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error(`Please enter a ${itemType.toLowerCase()} name`);
      return;
    }

    createCategory(
      {
        name: name.trim(),
        ...(parentCategoryId && { parentCategoryId }),
      },
      {
        onSuccess: () => {
          toast.success(`${itemType} created successfully`);
          setName("");
          setOpen(false);
        },
        onError: (error) => {
          toast.error(
            getError(error).message ||
              `Failed to create ${itemType.toLowerCase()}`,
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
            Add {itemType}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add {itemType}</DialogTitle>
            <DialogDescription>
              {isParentCategory
                ? `Create a new ${categoryLabel.toLowerCase()} to organize your ${moduleType === "service" ? "services" : moduleType === "real-estate" ? "listings" : "products"}.`
                : `Create a new ${subcategoryLabel.toLowerCase()} under this ${categoryLabel.toLowerCase()}.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{itemType} Name</Label>
              <Input
                id="name"
                placeholder={
                  isParentCategory
                    ? moduleType === "service"
                      ? "e.g., Household, Maintenance, Personal Care"
                      : moduleType === "real-estate"
                        ? "e.g., Residential, Commercial, Land"
                        : "e.g., Electronics, Clothing, Furniture"
                    : moduleType === "service"
                      ? "e.g., Cleaning, Repair, Cooking"
                      : moduleType === "real-estate"
                        ? "e.g., Apartments, Villas, Offices"
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
              {isPending ? "Creating..." : `Create ${itemType}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
