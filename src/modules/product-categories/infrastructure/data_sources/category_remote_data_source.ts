import type { HttpClient } from "@/core/api/http_client";
import type {
  ProductCategory,
  ProductCategoryAttribute,
  ProductCategoryTree,
} from "../../domain/entities/category_entity";
import {
  fromJsonToTree,
  type CategoryTreeResponse,
} from "../mappers/category_mapper";
import { endpoints } from "@/core/api/endpoints";
import type { CreateAttributeParams } from "../params/category_params";
import type { CreateCategoryParams } from "../params/category_params";

export class ProductCategoryRemoteDataSource {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getCategories(): Promise<ProductCategory[]> {
    const response = await this.httpClient.get<ProductCategory[]>(
      endpoints.products.getCategories,
    );

    return response.data;
  }

  async getCategoryAttributes(
    categoryId: string,
  ): Promise<ProductCategoryAttribute[]> {
    const response = await this.httpClient.get<ProductCategoryAttribute[]>(
      endpoints.products.getAttributesByCategory(categoryId),
    );

    return response.data;
  }

  async getCategoryTree(): Promise<ProductCategoryTree[]> {
    const response = await this.httpClient.get<CategoryTreeResponse[]>(
      endpoints.products.getCategoryTree,
    );

    return response.data.map(fromJsonToTree);
  }

  async createCategory(params: CreateCategoryParams): Promise<ProductCategory> {
    if (!params.parentCategoryId) delete params.parentCategoryId;

    const response = await this.httpClient.post<ProductCategory>(
      endpoints.products.createCategory,
      params,
    );

    return response.data;
  }

  async updateCategory(
    id: string,
    category: ProductCategory,
  ): Promise<ProductCategory> {
    const response = await this.httpClient.put<ProductCategory>(
      endpoints.products.updateCategory(id),
      category,
    );

    return response.data;
  }

  async createAttribute(
    categoryId: string,
    createAttributeParams: CreateAttributeParams[],
  ): Promise<ProductCategoryAttribute> {
    const response = await this.httpClient.post<ProductCategoryAttribute>(
      endpoints.products.createAttribute,
      {
        categoryId,
        attributes: createAttributeParams,
      },
    );

    return response.data;
  }

  async updateAttribute(
    id: string,
    attribute: ProductCategoryAttribute,
  ): Promise<ProductCategoryAttribute> {
    const response = await this.httpClient.put<ProductCategoryAttribute>(
      endpoints.products.updateAttribute(id),
      attribute,
    );

    return response.data;
  }
}
