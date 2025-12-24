import type { HttpClient } from "@/core/api/http_client";
import { endpoints } from "@/core/api/endpoints";
import type { Promotion } from "../../domain/entities/promotion_entity";
import type {
  CreatePromotionParams,
  UpdatePromotionParams,
  RejectPromotionParams,
} from "../params/promotion_params";

export class PromotionRemoteDataSource {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getPromotions(): Promise<Promotion[]> {
    const response = await this.httpClient.get<Promotion[]>(
      endpoints.promotions.getPromotions,
    );
    return response.data;
  }

  async getPromotionById(id: string): Promise<Promotion> {
    const response = await this.httpClient.get<Promotion>(
      endpoints.promotions.getPromotionById(id),
    );
    return response.data;
  }

  async createPromotion(params: CreatePromotionParams): Promise<Promotion> {
    const formData = new FormData();

    const { image, ...promotionData } = params;

    formData.append("promotion", JSON.stringify(promotionData));

    if (image instanceof File) {
      formData.append("image", image);
    }

    const response = await this.httpClient.post<Promotion>(
      endpoints.promotions.createPromotion,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  }

  async updatePromotion(
    id: string,
    params: UpdatePromotionParams,
  ): Promise<Promotion> {
    const response = await this.httpClient.patch<Promotion>(
      endpoints.promotions.updatePromotion(id),
      params,
    );
    return response.data;
  }

  async deletePromotion(id: string): Promise<Promotion> {
    const response = await this.httpClient.delete<Promotion>(
      endpoints.promotions.deletePromotion(id),
    );
    return response.data;
  }

  async approvePromotion(id: string): Promise<Promotion> {
    const response = await this.httpClient.patch<Promotion>(
      endpoints.promotions.approvePromotion(id),
    );

    return response.data;
  }

  async rejectPromotion(
    id: string,
    params: RejectPromotionParams,
  ): Promise<Promotion> {
    const response = await this.httpClient.patch<Promotion>(
      endpoints.promotions.rejectPromotion(id),
      params,
    );
    return response.data;
  }

  async cancelPromotion(id: string): Promise<Promotion> {
    const response = await this.httpClient.patch<Promotion>(
      endpoints.promotions.cancelPromotion(id),
    );
    return response.data;
  }
}
