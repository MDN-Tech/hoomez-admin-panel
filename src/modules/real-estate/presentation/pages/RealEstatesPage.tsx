import { useMemo, useState } from "react";
import {
  Search,
  Home,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
  Eye,
  MoreHorizontal,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/app/hooks/useDebounce";
import type { GetRealEstatesParams } from "../../infrastructure/params/real_estate_params";
import {
  REAL_ESTATE_STATUSES,
  type RealEstateStatus,
} from "../../domain/entities/real_estate_entity";
import { useGetRealEstates } from "../hooks/useGetRealEstates";
import { RealEstateDetailDialog } from "../components/RealEstateDetailDialog";

const parseNumberOrUndefined = (value: string) => {
  if (value === "") return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

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

export default function RealEstatesPage() {
  const [filters, setFilters] = useState<GetRealEstatesParams>({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "name",
    sortOrder: "ASC",
  });

  const debouncedSearch = useDebounce(filters.search || "", 500);

  const queryParams = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );

  const { data: realEstates, isLoading } = useGetRealEstates(queryParams);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (
    key: keyof GetRealEstatesParams,
    value: string | number | undefined,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      search: "",
      sortBy: "name",
      sortOrder: "ASC",
    });
  };

  const toggleSortByName = () => {
    setFilters((prev) => ({
      ...prev,
      sortBy: "name",
      sortOrder: prev.sortOrder === "ASC" ? "DESC" : "ASC",
    }));
  };

  const hasActiveFilters =
    filters.search ||
    filters.status ||
    filters.country ||
    filters.city ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minViews ||
    filters.maxViews;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Real Estates</h2>
          <p className="text-muted-foreground">
            Review listings, pricing, and engagement metrics.
          </p>
        </div>
      </div>

      <div className="bg-card space-y-4 rounded-xl border p-4 shadow-sm">
        <div className="flex gap-3 items-center">
          <div className="relative min-w-96">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search listings..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="focus:ring-primary/20 h-10 pl-10 transition-all focus:ring-2"
            />
          </div>
          <Select
            value={filters.status || "all"}
            onValueChange={(val) =>
              handleFilterChange(
                "status",
                val === "all" ? undefined : (val as RealEstateStatus),
              )
            }
          >
            <SelectTrigger className="text-muted-foreground h-10">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {REAL_ESTATE_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.limit?.toString()}
            onValueChange={(val) => handleFilterChange("limit", parseInt(val))}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 / Page</SelectItem>
              <SelectItem value="25">25 / Page</SelectItem>
              <SelectItem value="50">50 / Page</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr]">
          <Input
            placeholder="Country"
            value={filters.country ?? ""}
            onChange={(e) => handleFilterChange("country", e.target.value)}
          />
          <Input
            placeholder="City"
            value={filters.city ?? ""}
            onChange={(e) => handleFilterChange("city", e.target.value)}
          />
          <Input
            placeholder="Min price"
            type="number"
            value={filters.minPrice ?? ""}
            onChange={(e) =>
              handleFilterChange(
                "minPrice",
                parseNumberOrUndefined(e.target.value),
              )
            }
          />
          <Input
            placeholder="Max price"
            type="number"
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              handleFilterChange(
                "maxPrice",
                parseNumberOrUndefined(e.target.value),
              )
            }
          />
        </div>

        <div className="grid gap-3 lg:grid-cols-4">
          <Input
            placeholder="Min views"
            type="number"
            value={filters.minViews ?? ""}
            onChange={(e) =>
              handleFilterChange(
                "minViews",
                parseNumberOrUndefined(e.target.value),
              )
            }
          />
          <Input
            placeholder="Max views"
            type="number"
            value={filters.maxViews ?? ""}
            onChange={(e) =>
              handleFilterChange(
                "maxViews",
                parseNumberOrUndefined(e.target.value),
              )
            }
          />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-primary h-10"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-25 font-semibold">Image</TableHead>
              <TableHead
                className="hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={toggleSortByName}
              >
                <div className="flex items-center gap-1">
                  Listing
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="font-semibold">Location</TableHead>
              <TableHead className="text-right font-semibold">Price</TableHead>
              <TableHead className="text-center font-semibold">Views</TableHead>
              <TableHead className="text-center font-semibold">
                Status
              </TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-12 w-12 rounded-lg" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-32" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-5 w-20" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="mx-auto h-5 w-16" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="mx-auto h-5 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-8 w-8" />
                    </TableCell>
                  </TableRow>
                ))
            ) : realEstates && realEstates.length > 0 ? (
              realEstates.map((realEstate) => (
                <TableRow
                  key={realEstate.id}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="bg-muted ring-border/50 h-12 w-12 overflow-hidden rounded-lg border shadow-sm ring-1">
                      {realEstate.images?.[0] ? (
                        <img
                          src={realEstate.images[0].url}
                          alt={realEstate.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Home className="text-muted-foreground/50 h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <RealEstateDetailDialog
                      realEstateId={realEstate.id}
                      initialData={realEstate}
                      trigger={
                        <div className="text-foreground group-hover:text-primary cursor-pointer font-semibold transition-colors">
                          {realEstate.name}
                        </div>
                      }
                    />
                    <div className="text-muted-foreground mt-0.5 text-xs">
                      ID: {realEstate.id.slice(0, 8)}...
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      {realEstate.city}, {realEstate.country}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {realEstate.price !== undefined
                      ? `$${realEstate.price.toLocaleString()}`
                      : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="gap-1">
                      <Eye className="h-3 w-3" />
                      {realEstate.noOfViews.toLocaleString()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={getStatusBadgeClasses(realEstate.status)}
                    >
                      {realEstate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-muted text-muted-foreground font-medium"
                    >
                      {realEstate.category?.name || "Uncategorized"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-muted my-1 h-px" />
                        <RealEstateDetailDialog
                          realEstateId={realEstate.id}
                          initialData={realEstate}
                          trigger={
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                              className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          }
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-100 text-center">
                  <div className="animate-in fade-in zoom-in flex flex-col items-center justify-center gap-3 duration-300">
                    <div className="bg-muted rounded-full p-4">
                      <Home className="text-muted-foreground/50 h-12 w-12" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold tracking-tight">
                        No listings found
                      </h3>
                      <p className="text-muted-foreground">
                        Try adjusting your filters or search terms.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="mt-4"
                    >
                      Clear all filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="bg-muted/20 flex items-center justify-between border-t px-4 py-4">
          <div className="text-muted-foreground text-sm">
            Showing{" "}
            <span className="text-foreground font-medium">
              {realEstates?.length || 0}
            </span>{" "}
            listings
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(filters.page! - 1)}
              disabled={filters.page === 1 || isLoading}
              className="h-8 gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex min-w-8 items-center justify-center text-sm font-medium">
              {filters.page}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(filters.page! + 1)}
              disabled={
                (realEstates && realEstates.length < (filters.limit || 10)) ||
                isLoading
              }
              className="h-8 gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
