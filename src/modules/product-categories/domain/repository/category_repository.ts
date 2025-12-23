import type { ProductCategoryRemoteDataSource } from "../../infrastructure/data_sources/category_remote_data_source";
import type {
  CreateAttributeParams,
  CreateCategoryParams,
  UpdateAttributeParams,
  UpdateCategoryParams,
} from "../../infrastructure/params/category_params";
import type {
  ProductCategory,
  ProductCategoryAttribute,
  ProductCategoryTree,
} from "../entities/category_entity";

export class ProductCategoryRepository {
  private readonly remoteDataSource: ProductCategoryRemoteDataSource;

  constructor(remoteDataSource: ProductCategoryRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getCategories(): Promise<ProductCategory[]> {
    return await this.remoteDataSource.getCategories();
  }

  async getCategoryTree(): Promise<ProductCategoryTree[]> {
    return await this.remoteDataSource.getCategoryTree();
  }

  async getCategoryAttributes(
    categoryId: string,
  ): Promise<ProductCategoryAttribute[]> {
    return await this.remoteDataSource.getCategoryAttributes(categoryId);
  }

  async createCategory(params: CreateCategoryParams): Promise<ProductCategory> {
    return await this.remoteDataSource.createCategory(params);
  }

  async updateCategory(
    id: string,
    params: UpdateCategoryParams,
  ): Promise<ProductCategory> {
    return await this.remoteDataSource.updateCategory(id, params);
  }

  async createAttribute(
    categoryId: string,
    createAttributeParams: CreateAttributeParams[],
  ): Promise<ProductCategoryAttribute> {
    return await this.remoteDataSource.createAttribute(
      categoryId,
      createAttributeParams,
    );
  }

  async updateAttribute(
    id: string,
    params: UpdateAttributeParams,
  ): Promise<ProductCategoryAttribute> {
    return await this.remoteDataSource.updateAttribute(id, params);
  }
}
