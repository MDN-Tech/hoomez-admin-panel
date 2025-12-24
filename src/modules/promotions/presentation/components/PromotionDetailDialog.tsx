import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Megaphone,
  Calendar,
  Tag,
  Info,
  User,
  Mail,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { Promotion } from "../../domain/entities/promotion_entity";
import { useGetPromotionById } from "../hooks/useGetPromotionById";

import { PromotionStatusBadge } from "./PromotionStatusBadge";

interface PromotionDetailDialogProps {
  promotionId: string;
  trigger: React.ReactNode;
  initialData?: Partial<Promotion>;
}

export function PromotionDetailDialog({
  promotionId,
  trigger,
  initialData,
}: PromotionDetailDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: promotion, isLoading } = useGetPromotionById(promotionId, {
    enabled: isOpen,
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex max-h-[90vh] min-w-4xl flex-col overflow-hidden p-0">
        <DialogHeader className="border-b p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold">
                {isLoading ? (
                  <Skeleton className="h-8 w-64" />
                ) : (
                  promotion?.title || initialData?.title
                )}
              </DialogTitle>
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <Skeleton className="h-5 w-24 rounded-full" />
                ) : (
                  <PromotionStatusBadge
                    status={
                      promotion?.status || initialData?.status || "pending"
                    }
                  />
                )}
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground text-sm font-medium">
                  ID: {promotionId.slice(0, 12)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-primary text-2xl font-bold">
                {isLoading ? (
                  <Skeleton className="ml-auto h-8 w-20" />
                ) : promotion?.discountPercentage ? (
                  `-${promotion.discountPercentage}%`
                ) : (
                  `-$${promotion?.discountAmount}`
                )}
              </div>
              <div className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Discount
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="flex h-80 flex-col items-center justify-center gap-2 opacity-50">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
              <p className="text-sm font-medium">Fetching details...</p>
            </div>
          ) : promotion ? (
            <ScrollArea className="h-full">
              <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
                {/* Left Column: Image & Basic Info */}
                <div className="space-y-6">
                  <div className="bg-muted relative aspect-video overflow-hidden rounded-2xl border">
                    {promotion.image ? (
                      <img
                        src={promotion.image}
                        alt={promotion.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-muted-foreground/40 flex h-full w-full flex-col items-center justify-center gap-2">
                        <Megaphone className="h-12 w-12" />
                        <p className="text-sm">No promotion banner</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-muted-foreground flex items-center gap-2 font-medium">
                        <Tag className="h-4 w-4" /> Product
                      </div>
                      <div className="text-primary font-semibold">
                        {promotion.productName}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-muted-foreground flex items-center gap-2 font-medium">
                        <Info className="h-4 w-4" /> Base Price
                      </div>
                      <div className="font-semibold">
                        ${promotion.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {promotion.status === "rejected" &&
                    promotion.rejectionReason && (
                      <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm">
                        <div className="mb-1 flex items-center gap-2 font-bold text-red-600">
                          <AlertCircle className="h-4 w-4" /> Rejection Reason
                        </div>
                        <p className="leading-relaxed text-red-700 italic">
                          "{promotion.rejectionReason}"
                        </p>
                      </div>
                    )}
                </div>

                {/* Right Column: Time & Supplier */}
                <div className="space-y-6">
                  <div className="bg-muted/30 space-y-4 rounded-2xl border p-4">
                    <h4 className="flex items-center gap-2 text-sm font-bold">
                      <Calendar className="text-primary h-4 w-4" /> Timeline
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                          Starts
                        </div>
                        <div className="text-sm font-semibold">
                          {formatDate(promotion.startDate)}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                          Ends
                        </div>
                        <div className="text-sm font-semibold">
                          {formatDate(promotion.endDate)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 space-y-4 rounded-2xl border p-4">
                    <h4 className="flex items-center gap-2 text-sm font-bold">
                      <User className="text-primary h-4 w-4" /> Supplier Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary rounded-lg p-2">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs font-medium tracking-tighter uppercase">
                            Name
                          </p>
                          <p className="text-sm font-bold">
                            {promotion.supplierName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary rounded-lg p-2">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs font-medium tracking-tighter uppercase">
                            Email
                          </p>
                          <p className="text-sm font-bold break-all">
                            {promotion.supplierEmail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
                      Description
                    </h4>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      {promotion.description ||
                        "No description provided for this promotion."}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex h-80 flex-col items-center justify-center gap-2 opacity-50">
              <Megaphone className="text-muted-foreground h-10 w-10" />
              <p className="text-sm font-medium">Promotion details not found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
