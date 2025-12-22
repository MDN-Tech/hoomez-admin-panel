import type { HttpClient } from "@/core/api/http_client";
import type {
  ProductCategory,
  ProductCategoryAttribute,
  ProductCategoryTree,
} from "../../domain/entities/category_entity";
import {
  fromJsonToTree,
  type CategoryAttribuesResponse,
  type CategoryTreeResponse,
} from "../mappers/category_mapper";
import { endpoints } from "@/core/api/endpoints";

export class ProductCategoryRemoteDataSource {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getCategories(): Promise<ProductCategory[]> {
    const response = await this.httpClient.get<ProductCategory[]>(
      endpoints.products.categories,
    );

    return response.data;
  }

  async getCategoryAttributes(
    categoryId: string,
  ): Promise<ProductCategoryAttribute[]> {
    const response = await this.httpClient.get<CategoryAttribuesResponse>(
      endpoints.products.attributes(categoryId),
    );

    return response.data.attributes;
  }

  async getCategoryTree(): Promise<ProductCategoryTree[]> {
    const response = await this.httpClient.get<CategoryTreeResponse[]>(
      endpoints.products.categoryTree,
    );

    return response.data.map(fromJsonToTree);
  }

  async createCategory(
    categoryName: string,
    parentCategoryId?: string,
  ): Promise<ProductCategory> {
    const response = await this.httpClient.post<ProductCategory>(
      endpoints.products.categories,
      {
        name: categoryName,
        ...(parentCategoryId && { parentCategoryId }),
      },
    );

    return response.data;
  }

  async updateCategory(
    id: string,
    category: ProductCategory,
  ): Promise<ProductCategory> {
    const response = await this.httpClient.put<ProductCategory>(
      `${endpoints.products.categories}/${id}`,
      category,
    );

    return response.data;
  }
}
