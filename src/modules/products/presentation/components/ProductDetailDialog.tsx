import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Package,
  Tag,
  Layers,
  Info,
  Barcode,
  Box,
  LayoutGrid,
  Percent,
  Loader2,
} from "lucide-react";
import type { Product } from "../../domain/entities/product_entity";
import { useGetProductById } from "../hooks/useGetProductById";

interface ProductDetailDialogProps {
  productId: string;
  trigger: React.ReactNode;
  initialData?: Partial<Product>;
}

export function ProductDetailDialog({
  productId,
  trigger,
  initialData,
}: ProductDetailDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: product, isLoading } = useGetProductById(productId, {
    enabled: isOpen,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex max-h-[90vh] min-w-5xl flex-col overflow-hidden p-0">
        <DialogHeader className="border-b p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold">
                {isLoading ? (
                  <Skeleton className="h-8 w-64" />
                ) : (
                  product?.name || initialData?.name
                )}
              </DialogTitle>
              <div className="text-muted-foreground flex items-center gap-2">
                <span className="text-sm font-medium">
                  {isLoading ? (
                    <Skeleton className="h-4 w-24" />
                  ) : (
                    product?.brand || initialData?.brand || "Generic Brand"
                  )}
                </span>
                <span>•</span>
                {isLoading ? (
                  <Skeleton className="h-5 w-20 rounded-full" />
                ) : (
                  <Badge variant="outline" className="text-xs">
                    {product?.category.name ||
                      initialData?.category?.name ||
                      "Category"}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-primary text-2xl font-bold">
                {isLoading ? (
                  <Skeleton className="ml-auto h-8 w-24" />
                ) : product?.basePrice !== undefined ? (
                  `$${product.basePrice.toLocaleString()}`
                ) : initialData?.basePrice !== undefined ? (
                  `$${initialData.basePrice.toLocaleString()}`
                ) : (
                  "Price N/A"
                )}
              </div>
              {isLoading ? (
                <Skeleton className="mt-2 ml-auto h-5 w-20 rounded-full" />
              ) : (
                <Badge
                  variant={
                    (product?.stock ?? initialData?.stock ?? 0) > 10
                      ? "outline"
                      : "destructive"
                  }
                  className={
                    (product?.stock ?? initialData?.stock ?? 0) > 10
                      ? "border-green-200 bg-green-50 text-green-700"
                      : ""
                  }
                >
                  {product?.stock ?? initialData?.stock ?? 0} in stock
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="flex h-100 flex-col items-center justify-center gap-2 opacity-50">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
              <p className="text-sm font-medium">Fetching full details...</p>
            </div>
          ) : product ? (
            <ScrollArea className="h-full">
              <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
                {/* Left Column: Images */}
                <div className="space-y-6">
                  <div className="px-12">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {product.images && product.images.length > 0 ? (
                          product.images.map((img) => (
                            <CarouselItem key={img.id}>
                              <div className="group bg-muted relative aspect-square overflow-hidden rounded-2xl border transition-all hover:shadow-md">
                                <img
                                  src={img.url}
                                  alt={product.name}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                            </CarouselItem>
                          ))
                        ) : (
                          <CarouselItem>
                            <div className="bg-muted text-muted-foreground relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border opacity-50">
                              <Package className="mb-2 h-12 w-12" />
                              <p>No image available</p>
                            </div>
                          </CarouselItem>
                        )}
                      </CarouselContent>
                      {product.images && product.images.length > 1 && (
                        <>
                          <CarouselPrevious className="-left-10" />
                          <CarouselNext className="-right-10" />
                        </>
                      )}
                    </Carousel>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="flex items-center gap-2 text-sm font-semibold">
                      <Tag className="text-primary h-4 w-4" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {product.tags && product.tags.length > 0 ? (
                        product.tags.map((tag) => (
                          <Badge
                            key={tag.id}
                            variant="secondary"
                            className="font-normal"
                          >
                            #{tag.value}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm italic">
                          No tags
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Details & Tabs */}
                <div className="flex flex-col gap-6">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-6 grid w-full grid-cols-3">
                      <TabsTrigger value="overview" className="gap-2">
                        <Info className="h-4 w-4" /> Overview
                      </TabsTrigger>
                      <TabsTrigger value="variants" className="gap-2">
                        <Layers className="h-4 w-4" /> Variants
                      </TabsTrigger>
                      <TabsTrigger value="specs" className="gap-2">
                        <LayoutGrid className="h-4 w-4" /> Specs
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-0 space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                          Description
                        </h4>
                        <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-line">
                          {product.description ||
                            "No description provided for this product."}
                        </p>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Barcode className="h-3 w-3" /> Barcode/SKU
                          </span>
                          <span className="font-mono text-sm font-medium">
                            {product.barcode || "N/A"}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Box className="h-3 w-3" /> Base Stock
                          </span>
                          <span className="text-sm font-medium">
                            {product.stock ?? 0} units
                          </span>
                        </div>
                      </div>

                      {product.promotions && product.promotions.length > 0 && (
                        <div className="border-primary/10 bg-primary/5 space-y-2 rounded-xl border p-4">
                          <h4 className="text-primary flex items-center gap-2 text-sm font-semibold">
                            <Percent className="h-4 w-4" /> Active Promotions
                          </h4>
                          {product.promotions.map((promo) => (
                            <div
                              key={promo.id}
                              className="bg-background flex items-center justify-between rounded-lg border p-2 text-xs shadow-sm"
                            >
                              <span className="font-medium">{promo.name}</span>
                              <Badge variant="default" className="h-5 scale-90">
                                {promo.discountPercentage
                                  ? `-${promo.discountPercentage}%`
                                  : `-$${promo.discountAmount}`}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="variants" className="mt-0 space-y-4">
                      {product.variants && product.variants.length > 0 ? (
                        <div className="grid gap-3">
                          {product.variants.map((v) => (
                            <div
                              key={v.id}
                              className="group bg-card hover:border-primary/50 flex items-center justify-between rounded-xl border p-3 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="bg-muted h-10 w-10 overflow-hidden rounded border">
                                  {v.images?.[0] ? (
                                    <img
                                      src={v.images[0].url}
                                      className="h-full w-full object-cover"
                                      alt=""
                                    />
                                  ) : (
                                    <Package className="m-auto mt-2.5 h-5 w-5 opacity-20" />
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold">
                                    {v.sku}
                                  </div>
                                  <div className="text-muted-foreground text-xs">
                                    Stock: {v.stock}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold">
                                  ${v.price.toLocaleString()}
                                </div>
                                <div className="text-muted-foreground text-[10px]">
                                  per unit
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-10 text-center opacity-50">
                          <Layers className="mx-auto mb-2 h-8 w-8" />
                          <p className="text-sm">No variants defined</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="specs" className="mt-0 space-y-4">
                      <div className="grid gap-3">
                        {product.attributes && product.attributes.length > 0 ? (
                          product.attributes.map((attr) => (
                            <div
                              key={attr.id}
                              className="bg-muted/30 flex items-center justify-between rounded-lg border p-3"
                            >
                              <span className="text-muted-foreground text-sm font-medium">
                                {attr.name}
                              </span>
                              <Badge
                                variant="secondary"
                                className="font-mono text-[10px]"
                              >
                                {attr.dataType.toUpperCase()}
                              </Badge>
                            </div>
                          ))
                        ) : (
                          <div className="py-10 text-center opacity-50">
                            <LayoutGrid className="mx-auto mb-2 h-8 w-8" />
                            <p className="text-sm">No special attributes</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-100 flex-col items-center justify-center gap-2 opacity-50">
              <Package className="h-10 w-10" />
              <p className="text-sm font-medium">Product details not found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
