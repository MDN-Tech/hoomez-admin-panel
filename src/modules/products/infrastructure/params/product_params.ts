export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  productName?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  sortBy?: "name" | "brand";
  sortOrder?: "ASC" | "DESC";
}
