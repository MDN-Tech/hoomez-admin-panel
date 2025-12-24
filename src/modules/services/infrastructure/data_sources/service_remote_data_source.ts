import type { HttpClient } from "@/core/api/http_client";
import { endpoints } from "@/core/api/endpoints";
import type { Service } from "../../domain/entities/service_entity";
import type { GetServicesParams } from "../params/service_params";

export class ServiceRemoteDataSource {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getServices(params?: GetServicesParams): Promise<Service[]> {
    const response = await this.httpClient.get<Service[]>(
      endpoints.services.getServices,
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

  async getServiceById(id: string): Promise<Service> {
    const response = await this.httpClient.get<Service>(
      endpoints.services.getServiceById(id),
    );
    return response.data;
  }
}
