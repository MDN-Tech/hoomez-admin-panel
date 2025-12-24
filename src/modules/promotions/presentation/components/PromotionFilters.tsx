import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PromotionStatus } from "../../domain/entities/promotion_entity";

interface PromotionFiltersProps {
  search: string;
  setSearch: (search: string) => void;
  statusFilter: PromotionStatus | "all";
  setStatusFilter: (status: PromotionStatus | "all") => void;
  onClear: () => void;
}

export function PromotionFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onClear,
}: PromotionFiltersProps) {
  return (
    <div className="bg-card grid gap-4 rounded-xl border p-4 shadow-sm md:flex md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search promotions or products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus:ring-primary/20 h-10 pl-10 transition-all focus:ring-2"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(val: PromotionStatus | "all") => setStatusFilter(val)}
        >
          <SelectTrigger className="text-muted-foreground h-10 w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        {(search || statusFilter !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-primary"
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
