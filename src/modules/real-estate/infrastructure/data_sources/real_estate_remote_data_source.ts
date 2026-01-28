import type { HttpClient } from "@/core/api/http_client";
import { endpoints } from "@/core/api/endpoints";
import type { RealEstate } from "../../domain/entities/real_estate_entity";
import type { GetRealEstatesParams } from "../params/real_estate_params";

export class RealEstateRemoteDataSource {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getRealEstates(params?: GetRealEstatesParams): Promise<RealEstate[]> {
    const response = await this.httpClient.get<RealEstate[]>(
      endpoints.realEstates.getRealEstates,
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

  async getRealEstateById(id: string): Promise<RealEstate> {
    const response = await this.httpClient.get<RealEstate>(
      endpoints.realEstates.getRealEstateById(id),
    );
    return response.data;
  }
}
