import type { CategoryRemoteDataSource } from "../../infrastructure/data_sources/category_remote_data_source";
import type {
  CreateAttributeParams,
  CreateCategoryParams,
  UpdateAttributeParams,
  UpdateCategoryParams,
} from "../../infrastructure/params/category_params";
import type {
  Category,
  CategoryAttribute,
  CategoryTree,
} from "../entities/category_entity";

export class CategoryRepository {
  private readonly remoteDataSource: CategoryRemoteDataSource;

  constructor(remoteDataSource: CategoryRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getProductCategories(): Promise<Category[]> {
    return await this.remoteDataSource.getProductCategories();
  }

  async getServiceCategories(): Promise<Category[]> {
    return await this.remoteDataSource.getServiceCategories();
  }

  async getProductCategoryTree(): Promise<CategoryTree[]> {
    return await this.remoteDataSource.getProductCategoryTree();
  }

  async getServiceCategoryTree(): Promise<CategoryTree[]> {
    return await this.remoteDataSource.getServiceCategoryTree();
  }

  async getProductCategoryAttributes(
    categoryId: string,
  ): Promise<CategoryAttribute[]> {
    return await this.remoteDataSource.getProductCategoryAttributes(categoryId);
  }

  async getServiceCategoryAttributes(
    categoryId: string,
  ): Promise<CategoryAttribute[]> {
    return await this.remoteDataSource.getServiceCategoryAttributes(categoryId);
  }

  async createProductCategory(params: CreateCategoryParams): Promise<Category> {
    return await this.remoteDataSource.createProductCategory(params);
  }

  async createServiceCategory(params: CreateCategoryParams): Promise<Category> {
    return await this.remoteDataSource.createServiceCategory(params);
  }

  async updateProductCategory(
    id: string,
    params: UpdateCategoryParams,
  ): Promise<Category> {
    return await this.remoteDataSource.updateProductCategory(id, params);
  }

  async updateServiceCategory(
    id: string,
    params: UpdateCategoryParams,
  ): Promise<Category> {
    return await this.remoteDataSource.updateServiceCategory(id, params);
  }

  async createProductAttribute(
    categoryId: string,
    createAttributeParams: CreateAttributeParams[],
  ): Promise<CategoryAttribute> {
    return await this.remoteDataSource.createProductAttribute(
      categoryId,
      createAttributeParams,
    );
  }

  async createServiceAttribute(
    categoryId: string,
    createAttributeParams: CreateAttributeParams[],
  ): Promise<CategoryAttribute> {
    return await this.remoteDataSource.createServiceAttribute(
      categoryId,
      createAttributeParams,
    );
  }

  async updateProductAttribute(
    id: string,
    params: UpdateAttributeParams,
  ): Promise<CategoryAttribute> {
    return await this.remoteDataSource.updateProductAttribute(id, params);
  }

  async updateServiceAttribute(
    id: string,
    params: UpdateAttributeParams,
  ): Promise<CategoryAttribute> {
    return await this.remoteDataSource.updateServiceAttribute(id, params);
  }
}
