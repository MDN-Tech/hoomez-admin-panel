import type { ProductCategoryRemoteDataSource } from "../../infrastructure/data_sources/category_remote_data_source";
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

  async createCategory(
    categoryName: string,
    parentCategoryId?: string,
  ): Promise<ProductCategory> {
    return await this.remoteDataSource.createCategory(
      categoryName,
      parentCategoryId,
    );
  }

  async updateCategory(
    id: string,
    category: ProductCategory,
  ): Promise<ProductCategory> {
    return await this.remoteDataSource.updateCategory(id, category);
  }
}
