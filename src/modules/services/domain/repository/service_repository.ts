import type { Service } from "../entities/service_entity";
import type { GetServicesParams } from "../../infrastructure/params/service_params";
import type { ServiceRemoteDataSource } from "../../infrastructure/data_sources/service_remote_data_source";

export class ServiceRepository {
  private remoteDataSource: ServiceRemoteDataSource;

  constructor(remoteDataSource: ServiceRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  getServices(params?: GetServicesParams): Promise<Service[]> {
    return this.remoteDataSource.getServices(params);
  }

  getServiceById(id: string): Promise<Service> {
    return this.remoteDataSource.getServiceById(id);
  }
}
