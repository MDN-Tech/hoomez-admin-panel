import { createContext } from "react";
import { AuthLocalDataSource } from "@/modules/auth/infrastructure/data_sources/auth_local_data_source";
import { HttpClient } from "@/core/api/http_client";
import { AuthRemoteDataSource } from "@/modules/auth/infrastructure/data_sources/auth_remote_data_source";
import { AuthRepository } from "@/modules/auth/domain/repository/auth_repository";
import { TokenStorageService } from "@/core/services/token_storage_service";
import { DashboardRemoteDataSource } from "@/modules/dashboard/infrastructure/data_sources/dashboard_data_remote_data_source";
import { DashboardDataRepository } from "@/modules/dashboard/domain/repository/dashboard_data_repository";
import { CategoryRemoteDataSource } from "@/modules/categories/infrastructure/data_sources/category_remote_data_source";
import { CategoryRepository } from "@/modules/categories/domain/repository/category_repository";
import { ProductRemoteDataSource } from "@/modules/products/infrastructure/data_sources/product_remote_data_source";
import { ProductRepository } from "@/modules/products/domain/repository/product_repository";
import { ServiceRemoteDataSource } from "@/modules/services/infrastructure/data_sources/service_remote_data_source";
import { ServiceRepository } from "@/modules/services/domain/repository/service_repository";
import { PromotionRemoteDataSource } from "@/modules/promotions/infrastructure/data_sources/promotion_remote_data_source";
import { PromotionRepository } from "@/modules/promotions/domain/repository/promotion_repository";

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
const categoryRemoteDataSource = new CategoryRemoteDataSource(httpClient);
const categoryRepository = new CategoryRepository(categoryRemoteDataSource);

// Initialize product dependencies
const productRemoteDataSource = new ProductRemoteDataSource(httpClient);
const productRepository = new ProductRepository(productRemoteDataSource);

// Initialize service dependencies
const serviceRemoteDataSource = new ServiceRemoteDataSource(httpClient);
const serviceRepository = new ServiceRepository(serviceRemoteDataSource);

// Initialize promotion dependencies
const promotionRemoteDataSource = new PromotionRemoteDataSource(httpClient);
const promotionRepository = new PromotionRepository(promotionRemoteDataSource);

// Initialize repositories
export const repositories = {
  authRepository,
  dashboardRepository,
  categoryRepository,
  productRepository,
  serviceRepository,
  promotionRepository,
};

type Repositories = typeof repositories;

export const RepositoryContext = createContext<Repositories>(repositories);
