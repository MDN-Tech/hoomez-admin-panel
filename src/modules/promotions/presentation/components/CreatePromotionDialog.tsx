import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProducts } from "../../../products/presentation/hooks/useGetProducts";
import { useCreatePromotion } from "../hooks/useCreatePromotion";
import { toast } from "sonner";
import {
  Loader2,
  Upload,
  X,
  Calendar as CalendarIcon,
  Tag,
  Percent,
  DollarSign,
  Image as ImageIcon,
} from "lucide-react";
import type { CreatePromotionParams } from "../../infrastructure/params/promotion_params";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Product } from "../../../products/domain/entities/product_entity";
import { getError } from "@/core/helpers/error_messages";

interface CreatePromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePromotionDialog({
  open,
  onOpenChange,
}: CreatePromotionDialogProps) {
  const [formData, setFormData] = useState<Partial<CreatePromotionParams>>({
    title: "",
    productId: "",
    description: "",
    discountPercentage: 0,
    discountAmount: 0,
    startDate: "",
    endDate: "",
  });
  const [discountType, setDiscountType] = useState<"percentage" | "amount">(
    "percentage",
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: products, isLoading: productsLoading } = useGetProducts();
  const { mutate: createPromotion, isPending } = useCreatePromotion();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: undefined }));
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.productId ||
      !formData.startDate ||
      !formData.endDate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const params: CreatePromotionParams = {
      title: formData.title!,
      productId: formData.productId!,
      startDate: new Date(formData.startDate!).toISOString(),
      endDate: new Date(formData.endDate!).toISOString(),
      description: formData.description,
      image: formData.image,
    };

    if (discountType === "percentage") {
      params.discountPercentage = Number(formData.discountPercentage);
    } else {
      params.discountAmount = Number(formData.discountAmount);
    }

    createPromotion(params, {
      onSuccess: () => {
        toast.success("Promotion created successfully");
        onOpenChange(false);
        resetForm();
      },
      onError: (err: Error) => {
        toast.error(getError(err).message || "Failed to create promotion");
      },
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      productId: "",
      description: "",
      discountPercentage: 0,
      discountAmount: 0,
      startDate: "",
      endDate: "",
    });
    setDiscountType("percentage");
    setImagePreview(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) resetForm();
      }}
    >
      <DialogContent className="flex h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-150">
        <DialogHeader className="bg-muted/30 border-b p-6">
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <Tag className="text-primary h-6 w-6" />
            Create New Promotion
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="min-h-0 flex-1">
          <form
            id="create-promotion-form"
            onSubmit={handleSubmit}
            className="space-y-6 p-6"
          >
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="font-semibold">
                  Promotion Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Summer Seasonal Sale"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="productId" className="font-semibold">
                  Select Product <span className="text-destructive">*</span>
                </Label>
                <Select
                  disabled={productsLoading}
                  value={formData.productId}
                  onValueChange={(val) => handleSelectChange("productId", val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        productsLoading
                          ? "Loading products..."
                          : "Choose a product"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {products?.map((product: Product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="font-semibold">
                  Description
                </Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Tell us more about this promotion..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-background border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-25 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            {/* Discount Section */}
            <div className="bg-muted/30 space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">Discount Configuration</Label>
                <div className="bg-muted flex gap-1 rounded-md p-1">
                  <Button
                    type="button"
                    variant={
                      discountType === "percentage" ? "default" : "ghost"
                    }
                    size="sm"
                    className="h-8 rounded-sm px-3"
                    onClick={() => setDiscountType("percentage")}
                  >
                    <Percent className="mr-1 h-4 w-4" /> Percentage
                  </Button>
                  <Button
                    type="button"
                    variant={discountType === "amount" ? "default" : "ghost"}
                    size="sm"
                    className="h-8 rounded-sm px-3"
                    onClick={() => setDiscountType("amount")}
                  >
                    <DollarSign className="mr-1 h-4 w-4" /> Fixed Amount
                  </Button>
                </div>
              </div>

              {discountType === "percentage" ? (
                <div className="grid gap-2">
                  <Label htmlFor="discountPercentage">
                    Discount Percentage (%)
                  </Label>
                  <div className="relative">
                    <Percent className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="discountPercentage"
                      name="discountPercentage"
                      type="number"
                      min="0"
                      max="100"
                      className="pl-10"
                      value={formData.discountPercentage}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-2">
                  <Label htmlFor="discountAmount">Discount Amount</Label>
                  <div className="relative">
                    <DollarSign className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="discountAmount"
                      name="discountAmount"
                      type="number"
                      min="0"
                      className="pl-10"
                      value={formData.discountAmount}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Dates Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="startDate"
                  className="flex items-center gap-2 font-semibold"
                >
                  <CalendarIcon className="text-primary h-4 w-4" />
                  Start Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="endDate"
                  className="flex items-center gap-2 font-semibold"
                >
                  <CalendarIcon className="text-primary h-4 w-4" />
                  End Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 font-semibold">
                <ImageIcon className="text-primary h-4 w-4" />
                Promotion Banner
              </Label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <div className="group relative h-32 w-32 overflow-hidden rounded-lg border">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={removeImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="bg-muted/20 hover:bg-muted/40 relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed transition-colors">
                    <Upload className="text-muted-foreground mb-1 h-6 w-6" />
                    <span className="text-muted-foreground text-[10px]">
                      Click to upload
                    </span>
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
                <div className="text-muted-foreground flex-1 text-xs">
                  <p className="text-foreground mb-1 font-medium">
                    Upload a high-quality banner image.
                  </p>
                  <p>Supported formats: JPG, PNG, WEBP. Max size: 2MB.</p>
                </div>
              </div>
            </div>
          </form>
        </ScrollArea>

        <DialogFooter className="bg-muted/30 border-t p-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            type="button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-promotion-form"
            disabled={isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Promotion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
