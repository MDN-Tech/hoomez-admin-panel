import type { HttpClient } from "@/core/api/http_client";
import type {
  Category,
  CategoryAttribute,
  CategoryTree,
} from "../../domain/entities/category_entity";
import {
  fromJsonToTree,
  type CategoryTreeResponse,
} from "../mappers/category_mapper";
import { endpoints } from "@/core/api/endpoints";
import type {
  CreateAttributeParams,
  UpdateAttributeParams,
  UpdateCategoryParams,
} from "../params/category_params";
import type { CreateCategoryParams } from "../params/category_params";

export class CategoryRemoteDataSource {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getProductCategories(): Promise<Category[]> {
    const response = await this.httpClient.get<Category[]>(
      endpoints.products.getCategories,
    );

    return response.data;
  }

  async getServiceCategories(): Promise<Category[]> {
    const response = await this.httpClient.get<Category[]>(
      endpoints.services.getCategories,
    );

    return response.data;
  }

  async getProductCategoryAttributes(
    categoryId: string,
  ): Promise<CategoryAttribute[]> {
    const response = await this.httpClient.get<CategoryAttribute[]>(
      endpoints.products.getAttributesByCategory(categoryId),
    );

    return response.data;
  }

  async getServiceCategoryAttributes(
    categoryId: string,
  ): Promise<CategoryAttribute[]> {
    const response = await this.httpClient.get<CategoryAttribute[]>(
      endpoints.services.getAttributesByCategory(categoryId),
    );

    return response.data;
  }

  async getProductCategoryTree(): Promise<CategoryTree[]> {
    const response = await this.httpClient.get<CategoryTreeResponse[]>(
      endpoints.products.getCategoryTree,
    );

    return response.data.map(fromJsonToTree);
  }

  async getServiceCategoryTree(): Promise<CategoryTree[]> {
    const response = await this.httpClient.get<CategoryTreeResponse[]>(
      endpoints.services.getCategoryTree,
    );

    return response.data.map(fromJsonToTree);
  }

  async createProductCategory(params: CreateCategoryParams): Promise<Category> {
    if (!params.parentCategoryId) delete params.parentCategoryId;

    const response = await this.httpClient.post<Category>(
      endpoints.products.createCategory,
      params,
    );

    return response.data;
  }

  async createServiceCategory(params: CreateCategoryParams): Promise<Category> {
    if (!params.parentCategoryId) delete params.parentCategoryId;

    const response = await this.httpClient.post<Category>(
      endpoints.services.createCategory,
      params,
    );

    return response.data;
  }

  async updateProductCategory(
    id: string,
    params: UpdateCategoryParams,
  ): Promise<Category> {
    const response = await this.httpClient.put<Category>(
      endpoints.products.updateCategory(id),
      { name: params.name },
    );

    return response.data;
  }

  async updateServiceCategory(
    id: string,
    params: UpdateCategoryParams,
  ): Promise<Category> {
    const response = await this.httpClient.put<Category>(
      endpoints.services.updateCategory(id),
      { name: params.name },
    );

    return response.data;
  }

  async createProductAttribute(
    categoryId: string,
    createAttributeParams: CreateAttributeParams[],
  ): Promise<CategoryAttribute> {
    const response = await this.httpClient.post<CategoryAttribute>(
      endpoints.products.createAttribute,
      {
        categoryId,
        attributes: createAttributeParams,
      },
    );

    return response.data;
  }

  async createServiceAttribute(
    categoryId: string,
    createAttributeParams: CreateAttributeParams[],
  ): Promise<CategoryAttribute> {
    const response = await this.httpClient.post<CategoryAttribute>(
      endpoints.services.createAttribute,
      {
        categoryId,
        attributes: createAttributeParams,
      },
    );

    return response.data;
  }

  async updateProductAttribute(
    id: string,
    params: UpdateAttributeParams,
  ): Promise<CategoryAttribute> {
    const response = await this.httpClient.put<CategoryAttribute>(
      endpoints.products.updateAttribute(id),
      {
        name: params.name,
      },
    );

    return response.data;
  }

  async updateServiceAttribute(
    id: string,
    params: UpdateAttributeParams,
  ): Promise<CategoryAttribute> {
    const response = await this.httpClient.put<CategoryAttribute>(
      endpoints.services.updateAttribute(id),
      {
        name: params.name,
      },
    );

    return response.data;
  }
}
