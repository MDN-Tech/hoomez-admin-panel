import { useState, useMemo } from "react";
import {
  Search,
  Package,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
  Eye,
  MoreHorizontal,
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
import { useGetProducts } from "@/modules/products/presentation/hooks/useGetProducts";
import type { GetProductsParams } from "@/modules/products/infrastructure/params/product_params";
import { useGetCategories } from "@/modules/categories/presentation/hooks/useGetCategories";
import { useDebounce } from "@/app/hooks/useDebounce";
import { ProductDetailDialog } from "../components/ProductDetailDialog";

export default function ProductsPage() {
  const [filters, setFilters] = useState<GetProductsParams>({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "name",
    sortOrder: "ASC",
  });

  const debouncedSearch = useDebounce(filters.search || "", 500);

  // Use debounced search for the query
  const queryParams = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );

  const { data: products, isLoading } = useGetProducts(queryParams);
  const { data: categoryTrees } = useGetCategories({ moduleType: "product" });

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (
    key: keyof GetProductsParams,
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

  const toggleSort = (field: "name" | "brand") => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === "ASC" ? "DESC" : "ASC",
    }));
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product catalog, stock, and pricing.
          </p>
        </div>
      </div>

      <div className="bg-card grid gap-4 rounded-xl border p-4 shadow-sm md:flex md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="focus:ring-primary/20 h-10 pl-10 transition-all focus:ring-2"
            />
          </div>
          <Select
            value={filters.categoryId || "all"}
            onValueChange={(val) =>
              handleFilterChange("categoryId", val === "all" ? undefined : val)
            }
          >
            <SelectTrigger className="text-muted-foreground h-10 w-45">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoryTrees?.map((tree) => (
                <div key={tree.parentCategory.id}>
                  <SelectItem
                    value={tree.parentCategory.id}
                    className="font-bold"
                  >
                    {tree.parentCategory.name}
                  </SelectItem>
                  {tree.children.map((child) => (
                    <SelectItem
                      key={child.id}
                      value={child.id}
                      className="pl-6"
                    >
                      {child.name}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
          {(filters.search || filters.categoryId || filters.brand) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-primary"
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={filters.limit?.toString()}
            onValueChange={(val) => handleFilterChange("limit", parseInt(val))}
          >
            <SelectTrigger className="h-10 w-27.5">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 / Page</SelectItem>
              <SelectItem value="25">25 / Page</SelectItem>
              <SelectItem value="50">50 / Page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-25 font-semibold">Image</TableHead>
              <TableHead
                className="hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={() => toggleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Product Name
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="text-right font-semibold">Price</TableHead>
              <TableHead className="text-center font-semibold">Stock</TableHead>
              <TableHead
                className="hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={() => toggleSort("brand")}
              >
                <div className="flex items-center gap-1">
                  Brand
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
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
                      <Skeleton className="h-5 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-5 w-16" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="mx-auto h-5 w-12" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-28" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="ml-auto h-8 w-8" />
                    </TableCell>
                  </TableRow>
                ))
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <TableRow
                  key={product.id}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div className="bg-muted ring-border/50 h-12 w-12 overflow-hidden rounded-lg border shadow-sm ring-1">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="text-muted-foreground/50 h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <ProductDetailDialog
                      productId={product.id}
                      initialData={product}
                      trigger={
                        <div className="text-foreground group-hover:text-primary cursor-pointer font-semibold transition-colors">
                          {product.name}
                        </div>
                      }
                    />
                    <div className="text-muted-foreground mt-0.5 text-xs">
                      ID: {product.id.slice(0, 8)}...
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-muted text-muted-foreground font-medium"
                    >
                      {product.category.name || "Uncategorized"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {product.basePrice !== undefined
                      ? `$${product.basePrice.toLocaleString()}`
                      : "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        product.stock !== undefined && product.stock < 10
                          ? "destructive"
                          : "outline"
                      }
                      className={
                        product.stock !== undefined && product.stock >= 10
                          ? "border-green-200 bg-green-500/10 text-green-600"
                          : ""
                      }
                    >
                      {product.stock ?? "—"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.brand || "—"}
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
                        <ProductDetailDialog
                          productId={product.id}
                          initialData={product}
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
                <TableCell colSpan={7} className="h-100 text-center">
                  <div className="animate-in fade-in zoom-in flex flex-col items-center justify-center gap-3 duration-300">
                    <div className="bg-muted rounded-full p-4">
                      <Package className="text-muted-foreground/50 h-12 w-12" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold tracking-tight">
                        No products found
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

        {/* Pagination Footer */}
        <div className="bg-muted/20 flex items-center justify-between border-t px-4 py-4">
          <div className="text-muted-foreground text-sm">
            Showing{" "}
            <span className="text-foreground font-medium">
              {products?.length || 0}
            </span>{" "}
            products
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
                (products && products.length < (filters.limit || 10)) ||
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
