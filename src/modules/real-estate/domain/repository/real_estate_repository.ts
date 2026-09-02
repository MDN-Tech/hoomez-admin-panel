import type { RealEstateRemoteDataSource } from "../../infrastructure/data_sources/real_estate_remote_data_source";
import type { GetRealEstatesParams } from "../../infrastructure/params/real_estate_params";
import type { RealEstate } from "../entities/real_estate_entity";

export class RealEstateRepository {
  private readonly remoteDataSource: RealEstateRemoteDataSource;

  constructor(remoteDataSource: RealEstateRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async getRealEstates(params?: GetRealEstatesParams): Promise<RealEstate[]> {
    return await this.remoteDataSource.getRealEstates(params);
  }

  async getRealEstateById(id: string): Promise<RealEstate> {
    return await this.remoteDataSource.getRealEstateById(id);
  }
}
