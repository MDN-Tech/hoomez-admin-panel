import type { HttpClient } from "@/core/api/http_client";
import { endpoints } from "@/core/api/endpoints";
import type { Product } from "../../domain/entities/product_entity";
import type { GetProductsParams } from "../params/product_params";

export class ProductRemoteDataSource {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getProducts(params?: GetProductsParams): Promise<Product[]> {
    const response = await this.httpClient.get<Product[]>(
      endpoints.products.getProducts,
      {
        params: {
          ...params,
          limit: params?.limit ?? 10,
          sortOrder: params?.sortOrder ?? "ASC",
        },
      },
    );
    return response.data;
  }

  async getProductById(id: string): Promise<Product> {
    const response = await this.httpClient.get<Product>(
      endpoints.products.getProductById(id),
    );
    return response.data;
  }
}
