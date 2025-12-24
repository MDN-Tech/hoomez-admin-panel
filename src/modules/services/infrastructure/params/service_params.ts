export interface GetServicesParams {
  page?: number;
  limit?: number;
  search?: string;
  serviceName?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  sortBy?: "name" | "price";
  sortOrder?: "ASC" | "DESC";
}
