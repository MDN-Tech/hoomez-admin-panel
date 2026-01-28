import type { RealEstateStatus } from "../../domain/entities/real_estate_entity";

export interface GetRealEstatesParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "name" | "brand";
  sortOrder?: "ASC" | "DESC";
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  minViews?: number;
  maxViews?: number;
  country?: string;
  city?: string;
  address?: string;
  status?: RealEstateStatus;
  categoryId?: string;
}
