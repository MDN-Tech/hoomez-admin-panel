import type { Promotion } from "../entities/promotion_entity";
import type {
  CreatePromotionParams,
  UpdatePromotionParams,
  RejectPromotionParams,
} from "../../infrastructure/params/promotion_params";
import type { PromotionRemoteDataSource } from "../../infrastructure/data_sources/promotion_remote_data_source";

export class PromotionRepository {
  private remoteDataSource: PromotionRemoteDataSource;

  constructor(remoteDataSource: PromotionRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  getPromotions(): Promise<Promotion[]> {
    return this.remoteDataSource.getPromotions();
  }

  getPromotionById(id: string): Promise<Promotion> {
    return this.remoteDataSource.getPromotionById(id);
  }

  createPromotion(params: CreatePromotionParams): Promise<Promotion> {
    return this.remoteDataSource.createPromotion(params);
  }

  updatePromotion(
    id: string,
    params: UpdatePromotionParams,
  ): Promise<Promotion> {
    return this.remoteDataSource.updatePromotion(id, params);
  }

  deletePromotion(id: string): Promise<Promotion> {
    return this.remoteDataSource.deletePromotion(id);
  }

  approvePromotion(id: string): Promise<Promotion> {
    return this.remoteDataSource.approvePromotion(id);
  }

  rejectPromotion(
    id: string,
    params: RejectPromotionParams,
  ): Promise<Promotion> {
    return this.remoteDataSource.rejectPromotion(id, params);
  }

  cancelPromotion(id: string): Promise<Promotion> {
    return this.remoteDataSource.cancelPromotion(id);
  }
}
