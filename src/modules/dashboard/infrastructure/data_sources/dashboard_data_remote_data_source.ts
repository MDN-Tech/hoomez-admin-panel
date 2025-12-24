// src/modules/dashboard/infrastructure/data_sources/dashboard_remote_data_source.ts
import type { HttpClient } from "@/core/api/http_client";
import type { DashboardData } from "../../domain/entities/dashboard_data_entity";
import type { DashboardDataResponse } from "../mappers/dashboard_data_mapper";
import { toDomain } from "../mappers/dashboard_data_mapper";
import { endpoints } from "@/core/api/endpoints";

export class DashboardRemoteDataSource {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getDashboardData(): Promise<DashboardData> {
    const response = await this.httpClient.get<DashboardDataResponse>(
      endpoints.dashboard.getFullData,
    );

    return toDomain(response.data);
  }
}
