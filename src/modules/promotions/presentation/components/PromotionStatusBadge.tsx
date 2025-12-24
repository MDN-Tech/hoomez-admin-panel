import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, Ban } from "lucide-react";
import type { PromotionStatus } from "../../domain/entities/promotion_entity";

interface PromotionStatusBadgeProps {
  status: PromotionStatus;
  className?: string;
}

export function PromotionStatusBadge({
  status,
  className,
}: PromotionStatusBadgeProps) {
  switch (status) {
    case "approved":
      return (
        <Badge
          className={`gap-1 border-green-200 bg-green-500/10 text-green-600 hover:bg-green-500/20 ${className}`}
        >
          <CheckCircle2 className="h-3 w-3" /> Approved
        </Badge>
      );
    case "pending":
      return (
        <Badge
          variant="outline"
          className={`gap-1 border-yellow-200 bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 ${className}`}
        >
          <Clock className="h-3 w-3" /> Pending
        </Badge>
      );
    case "rejected":
      return (
        <Badge
          variant="destructive"
          className={`gap-1 border-red-200 bg-red-500/10 text-red-600 hover:bg-red-500/20 ${className}`}
        >
          <XCircle className="h-3 w-3" /> Rejected
        </Badge>
      );
    case "cancelled":
      return (
        <Badge
          variant="secondary"
          className={`gap-1 border-gray-200 bg-gray-500/10 text-gray-600 hover:bg-gray-500/20 ${className}`}
        >
          <Ban className="h-3 w-3" /> Cancelled
        </Badge>
      );
    case "expired":
      return (
        <Badge
          variant="outline"
          className={`gap-1 border-orange-200 bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 ${className}`}
        >
          <Clock className="h-3 w-3" /> Expired
        </Badge>
      );
    default:
      return <Badge className={className}>{status}</Badge>;
  }
}
