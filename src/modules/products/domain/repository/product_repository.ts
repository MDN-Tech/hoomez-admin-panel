import type { ProductRemoteDataSource } from "../../infrastructure/data_sources/product_remote_data_source";
import type { Product } from "../entities/product_entity";
import type { GetProductsParams } from "../../infrastructure/params/product_params";

export class ProductRepository {
  private readonly remoteDataSource: ProductRemoteDataSource;

  constructor(remoteDataSource: ProductRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getProducts(params?: GetProductsParams): Promise<Product[]> {
    return await this.remoteDataSource.getProducts(params);
  }

  async getProductById(id: string): Promise<Product> {
    return await this.remoteDataSource.getProductById(id);
  }
}
