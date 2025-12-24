import type { DashboardData } from "../entities/dashboard_data_entity";
import { DashboardRemoteDataSource } from "../../infrastructure/data_sources/dashboard_data_remote_data_source";

// Implementation
export class DashboardDataRepository {
  private readonly remoteDataSource: DashboardRemoteDataSource;

  constructor(remoteDataSource: DashboardRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getDashboardData(): Promise<DashboardData> {
    const data = await this.remoteDataSource.getDashboardData();
    return data;
  }
}
