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
import { Tag, Layers, Info, LayoutGrid, Loader2, Wrench } from "lucide-react";
import type { Service } from "../../domain/entities/service_entity";
import { useGetServiceById } from "../hooks/useGetServiceById";

interface ServiceDetailDialogProps {
  serviceId: string;
  trigger: React.ReactNode;
  initialData?: Partial<Service>;
}

export function ServiceDetailDialog({
  serviceId,
  trigger,
  initialData,
}: ServiceDetailDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: service, isLoading } = useGetServiceById(serviceId, {
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
                  service?.name || initialData?.name
                )}
              </DialogTitle>
              <div className="text-muted-foreground flex items-center gap-2">
                {isLoading ? (
                  <Skeleton className="h-5 w-24 rounded-full" />
                ) : (
                  <Badge variant="outline" className="text-xs">
                    {service?.category.name ||
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
                ) : service?.basePrice !== undefined ? (
                  `$${service.basePrice.toLocaleString()}`
                ) : initialData?.basePrice !== undefined ? (
                  `$${initialData.basePrice.toLocaleString()}`
                ) : (
                  "Price N/A"
                )}
              </div>
              <div className="text-muted-foreground text-xs font-medium">
                Starting Price
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="flex h-100 flex-col items-center justify-center gap-2 opacity-50">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
              <p className="text-sm font-medium">Fetching full details...</p>
            </div>
          ) : service ? (
            <ScrollArea className="h-full">
              <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
                {/* Left Column: Images */}
                <div className="space-y-6">
                  <div className="px-12">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {service.images && service.images.length > 0 ? (
                          service.images.map((img) => (
                            <CarouselItem key={img.id}>
                              <div className="group bg-muted relative aspect-square overflow-hidden rounded-2xl border transition-all hover:shadow-md">
                                <img
                                  src={img.url}
                                  alt={service.name}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                            </CarouselItem>
                          ))
                        ) : (
                          <CarouselItem>
                            <div className="bg-muted text-muted-foreground relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border opacity-50">
                              <Wrench className="mb-2 h-12 w-12" />
                              <p>No image available</p>
                            </div>
                          </CarouselItem>
                        )}
                      </CarouselContent>
                      {service.images && service.images.length > 1 && (
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
                      {service.tags && service.tags.length > 0 ? (
                        service.tags.map((tag) => (
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
                      <TabsTrigger value="packages" className="gap-2">
                        <Layers className="h-4 w-4" /> Packages
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
                          {service.description ||
                            "No description provided for this service."}
                        </p>
                      </div>

                      <Separator />

                      <div className="bg-muted/30 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Wrench className="text-primary h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">
                              Service ID
                            </div>
                            <div className="text-muted-foreground font-mono text-xs">
                              {service.id}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="packages" className="mt-0 space-y-4">
                      {service.packages && service.packages.length > 0 ? (
                        <div className="grid gap-3">
                          {service.packages.map((pkg) => (
                            <div
                              key={pkg.id}
                              className="group bg-card hover:border-primary/50 flex flex-col gap-3 rounded-xl border p-4 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="bg-muted h-12 w-12 overflow-hidden rounded border">
                                    {pkg.images?.[0] ? (
                                      <img
                                        src={pkg.images[0].url}
                                        className="h-full w-full object-cover"
                                        alt=""
                                      />
                                    ) : (
                                      <Layers className="m-auto mt-3 h-6 w-6 opacity-20" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="text-sm font-semibold">
                                      {pkg.name}
                                    </div>
                                    <div className="text-primary text-sm font-bold">
                                      ${pkg.price.toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p className="text-muted-foreground line-clamp-2 text-xs">
                                {pkg.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-10 text-center opacity-50">
                          <Layers className="mx-auto mb-2 h-8 w-8" />
                          <p className="text-sm">No packages defined</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="specs" className="mt-0 space-y-4">
                      <div className="grid gap-3">
                        {service.attributes && service.attributes.length > 0 ? (
                          service.attributes.map((attr) => (
                            <div
                              key={attr.id}
                              className="bg-muted/30 flex items-center justify-between rounded-lg border p-3"
                            >
                              <div className="space-y-0.5">
                                <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                                  {attr.name}
                                </span>
                                <div className="text-sm font-semibold">
                                  {attr.dataType === "string" &&
                                    attr.stringValue}
                                  {attr.dataType === "number" &&
                                    attr.numberValue}
                                  {attr.dataType === "boolean" &&
                                    (attr.booleanValue ? "Yes" : "No")}
                                  {attr.dataType === "date" &&
                                    attr.dateValue &&
                                    new Date(
                                      attr.dateValue,
                                    ).toLocaleDateString()}
                                </div>
                              </div>
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
              <Wrench className="h-10 w-10" />
              <p className="text-sm font-medium">Service details not found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
