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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateAttributes } from "../hooks/useCreateAttributes";
import { toast } from "sonner";
import type { AttributeDataType } from "../../domain/entities/category_entity";
import { useCategoryContext } from "../hooks/useCategoryContext";
import { getError } from "@/core/helpers/error_messages";

interface AddAttributeDialogProps {
  categoryId: string;
  trigger?: React.ReactNode;
}

export function AddAttributeDialog({
  categoryId,
  trigger,
}: AddAttributeDialogProps) {
  const { isService, categoryLabel } = useCategoryContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [dataType, setDataType] = useState<AttributeDataType>("string");

  const { mutate: createAttributes, isPending } = useCreateAttributes({
    isService,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter an attribute name");
      return;
    }

    createAttributes(
      {
        categoryId,
        attributes: [{ name: name.trim(), dataType }],
      },
      {
        onSuccess: () => {
          toast.success("Attribute created successfully");
          setName("");
          setDataType("string");
          setOpen(false);
        },
        onError: (error) => {
          toast.error(getError(error).message || "Failed to create attribute");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="h-7 gap-2 text-xs">
            <Plus className="h-3 w-3" />
            Add Attribute
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Attribute</DialogTitle>
            <DialogDescription>
              Create a new attribute for this {categoryLabel.toLowerCase()}.
              Attributes define the properties that{" "}
              {isService ? "services" : "products"} in this{" "}
              {categoryLabel.toLowerCase()} can have.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Attribute Name</Label>
              <Input
                id="name"
                placeholder={
                  isService
                    ? "e.g., Duration, Experience, Tools Required"
                    : "e.g., Color, Size, Material"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending}
                autoFocus
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dataType">Data Type</Label>
              <Select
                value={dataType}
                onValueChange={(value) =>
                  setDataType(value as AttributeDataType)
                }
                disabled={isPending}
              >
                <SelectTrigger id="dataType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String (Text)</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean (Yes/No)</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
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
              {isPending ? "Creating..." : "Create Attribute"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
