import React, { useMemo, useState } from "react";
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
  Home,
  MapPin,
  Tag,
  Info,
  Eye,
  LayoutGrid,
  Calendar,
  Loader2,
} from "lucide-react";
import type {
  RealEstate,
  RealEstateStatus,
} from "../../domain/entities/real_estate_entity";
import { useGetRealEstateById } from "../hooks/useGetRealEstateById";

interface RealEstateDetailDialogProps {
  realEstateId: string;
  trigger: React.ReactNode;
  initialData?: Partial<RealEstate>;
}

const getStatusBadgeClasses = (status?: RealEstateStatus) => {
  switch (status) {
    case "active":
      return "border-emerald-200 bg-emerald-500/10 text-emerald-700";
    case "expired":
      return "border-amber-200 bg-amber-500/10 text-amber-700";
    case "sold":
      return "border-rose-200 bg-rose-500/10 text-rose-700";
    default:
      return "";
  }
};

export function RealEstateDetailDialog({
  realEstateId,
  trigger,
  initialData,
}: RealEstateDetailDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: realEstate, isLoading } = useGetRealEstateById(realEstateId, {
    enabled: isOpen,
  });

  const formattedExpiry = useMemo(() => {
    const dateValue = realEstate?.expiryDate || initialData?.expiryDate;
    if (!dateValue) return "N/A";
    const parsed = new Date(dateValue);
    return Number.isNaN(parsed.getTime())
      ? dateValue
      : parsed.toLocaleDateString();
  }, [realEstate?.expiryDate, initialData?.expiryDate]);

  const title = realEstate?.name || initialData?.name || "Untitled Listing";
  const status = realEstate?.status || initialData?.status;
  const price = realEstate?.price ?? initialData?.price;
  const location = [
    realEstate?.city || initialData?.city,
    realEstate?.country || initialData?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex max-h-[90vh] min-w-5xl flex-col overflow-hidden p-0">
        <DialogHeader className="border-b p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold">
                {isLoading ? <Skeleton className="h-8 w-64" /> : title}
              </DialogTitle>
              <div className="text-muted-foreground flex items-center gap-2">
                {isLoading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <span className="flex items-center gap-1 text-sm font-medium">
                    <MapPin className="h-4 w-4" />
                    {location || "Location unavailable"}
                  </span>
                )}
                <span>•</span>
                {isLoading ? (
                  <Skeleton className="h-5 w-20 rounded-full" />
                ) : (
                  <Badge
                    variant="outline"
                    className={getStatusBadgeClasses(status)}
                  >
                    {status || "unknown"}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-primary text-2xl font-bold">
                {isLoading ? (
                  <Skeleton className="ml-auto h-8 w-24" />
                ) : price !== undefined ? (
                  `$${price.toLocaleString()}`
                ) : (
                  "Price N/A"
                )}
              </div>
              {isLoading ? (
                <Skeleton className="mt-2 ml-auto h-5 w-28 rounded-full" />
              ) : (
                <Badge variant="secondary" className="mt-2">
                  <Eye className="mr-1 h-3 w-3" />
                  {realEstate?.noOfViews ?? initialData?.noOfViews ?? 0} views
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
          ) : realEstate ? (
            <ScrollArea className="h-full">
              <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-2">
                <div className="space-y-6">
                  <div className="px-12">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {realEstate.images && realEstate.images.length > 0 ? (
                          realEstate.images.map((img) => (
                            <CarouselItem key={img.id}>
                              <div className="group bg-muted relative aspect-square overflow-hidden rounded-2xl border transition-all hover:shadow-md">
                                <img
                                  src={img.url}
                                  alt={realEstate.name}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              </div>
                            </CarouselItem>
                          ))
                        ) : (
                          <CarouselItem>
                            <div className="bg-muted text-muted-foreground relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border opacity-50">
                              <Home className="mb-2 h-12 w-12" />
                              <p>No image available</p>
                            </div>
                          </CarouselItem>
                        )}
                      </CarouselContent>
                      {realEstate.images && realEstate.images.length > 1 && (
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
                      {realEstate.tags && realEstate.tags.length > 0 ? (
                        realEstate.tags.map((tag) => (
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

                <div className="flex flex-col gap-6">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-6 grid w-full grid-cols-3">
                      <TabsTrigger value="overview" className="gap-2">
                        <Info className="h-4 w-4" /> Overview
                      </TabsTrigger>
                      <TabsTrigger value="location" className="gap-2">
                        <MapPin className="h-4 w-4" /> Location
                      </TabsTrigger>
                      <TabsTrigger value="attributes" className="gap-2">
                        <LayoutGrid className="h-4 w-4" /> Attributes
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-0 space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                          Description
                        </h4>
                        <p className="text-foreground/80 text-sm leading-relaxed whitespace-pre-line">
                          {realEstate.description ||
                            "No description provided for this listing."}
                        </p>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Home className="h-3 w-3" /> Category
                          </span>
                          <span className="text-sm font-medium">
                            {realEstate.category?.name || "Uncategorized"}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Calendar className="h-3 w-3" /> Expiry Date
                          </span>
                          <span className="text-sm font-medium">
                            {formattedExpiry}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Eye className="h-3 w-3" /> Views
                          </span>
                          <span className="text-sm font-medium">
                            {realEstate.noOfViews.toLocaleString()}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Info className="h-3 w-3" /> Status
                          </span>
                          <Badge
                            variant="outline"
                            className={getStatusBadgeClasses(realEstate.status)}
                          >
                            {realEstate.status}
                          </Badge>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="location" className="mt-0 space-y-4">
                      <div className="grid gap-4">
                        <div className="bg-muted/30 flex items-center justify-between rounded-lg border p-3">
                          <span className="text-muted-foreground text-sm font-medium">
                            Country
                          </span>
                          <span className="text-sm font-semibold">
                            {realEstate.country}
                          </span>
                        </div>
                        <div className="bg-muted/30 flex items-center justify-between rounded-lg border p-3">
                          <span className="text-muted-foreground text-sm font-medium">
                            City
                          </span>
                          <span className="text-sm font-semibold">
                            {realEstate.city}
                          </span>
                        </div>
                        <div className="bg-muted/30 flex items-start justify-between rounded-lg border p-3">
                          <span className="text-muted-foreground text-sm font-medium">
                            Address
                          </span>
                          <span className="text-right text-sm font-semibold">
                            {realEstate.address}
                          </span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="attributes" className="mt-0 space-y-4">
                      <div className="grid gap-3">
                        {realEstate.attributes &&
                        realEstate.attributes.length > 0 ? (
                          realEstate.attributes.map((attr) => (
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
                            <p className="text-sm">No attributes assigned</p>
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
              <Home className="h-10 w-10" />
              <p className="text-sm font-medium">Listing details not found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
