import { createContext } from "react";
import { AuthLocalDataSource } from "@/modules/auth/infrastructure/data_sources/auth_local_data_source";
import { HttpClient } from "@/core/api/http_client";
import { AuthRemoteDataSource } from "@/modules/auth/infrastructure/data_sources/auth_remote_data_source";
import { AuthRepository } from "@/modules/auth/domain/repository/auth_repository";
import { TokenStorageService } from "@/core/services/token_storage_service";
import { DashboardRemoteDataSource } from "@/modules/dashboard/infrastructure/data_sources/dashboard_data_remote_data_source";
import { DashboardDataRepository } from "@/modules/dashboard/domain/repository/dashboard_data_repository";
import { ProductCategoryRemoteDataSource } from "@/modules/product-categories/infrastructure/data_sources/category_remote_data_source";
import { ProductCategoryRepository } from "@/modules/product-categories/domain/repository/category_repository";

// Initialize core dependencies
const tokenStorageService = new TokenStorageService();
const authLocalDataSource = new AuthLocalDataSource(tokenStorageService);
const httpClient = new HttpClient(authLocalDataSource);

// Initialize auth dependencies
const authRemoteDataSource = new AuthRemoteDataSource(httpClient);
const authRepository = new AuthRepository(
  authLocalDataSource,
  authRemoteDataSource,
);

// Initialize dashboard dependencies
const dashboardRemoteDataSource = new DashboardRemoteDataSource(httpClient);
const dashboardRepository = new DashboardDataRepository(
  dashboardRemoteDataSource,
);

// Initialize category dependencies
const categoryRemoteDataSource = new ProductCategoryRemoteDataSource(
  httpClient,
);
const categoryRepository = new ProductCategoryRepository(
  categoryRemoteDataSource,
);

// Initialize repositories
export const repositories = {
  authRepository,
  dashboardRepository,
  categoryRepository,
};

type Repositories = typeof repositories;

export const RepositoryContext = createContext<Repositories>(repositories);
