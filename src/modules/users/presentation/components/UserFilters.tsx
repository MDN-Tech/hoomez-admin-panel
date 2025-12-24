import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import type { UserRole } from "@/modules/auth/domain/entities/user_entity";

interface UserFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  roleFilter: UserRole | "all";
  setRoleFilter: (val: UserRole | "all") => void;
  onClear: () => void;
}

export function UserFilters({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
  onClear,
}: UserFiltersProps) {
  const hasFilters = search !== "" || roleFilter !== "all";

  return (
    <div className="bg-card flex flex-col items-center gap-4 rounded-xl border p-4 shadow-sm md:flex-row">
      <div className="relative w-full flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search by name or email..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex w-full items-center gap-2 md:w-auto">
        <div className="relative flex-1 md:w-48">
          <Filter className="text-muted-foreground absolute top-1/2 left-3 z-10 h-3.5 w-3.5 -translate-y-1/2" />
          <Select
            value={roleFilter}
            onValueChange={(val) => setRoleFilter(val as UserRole | "all")}
          >
            <SelectTrigger className="pl-9">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
              <SelectItem value="customer">Customers</SelectItem>
              <SelectItem value="supplier">Suppliers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground h-10 px-3"
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
