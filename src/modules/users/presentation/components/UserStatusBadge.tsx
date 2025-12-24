import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Ban } from "lucide-react";

interface UserStatusBadgeProps {
  isActive: boolean;
}

export function UserStatusBadge({ isActive }: UserStatusBadgeProps) {
  if (isActive) {
    return (
      <Badge
        variant="outline"
        className="gap-1 border-green-200 bg-green-50 px-2 py-0.5 font-medium text-green-700"
      >
        <CheckCircle2 className="h-3 w-3" />
        Active
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="gap-1 border-red-200 bg-red-50 px-2 py-0.5 font-medium text-red-700"
    >
      <Ban className="h-3 w-3" />
      Inactive
    </Badge>
  );
}
