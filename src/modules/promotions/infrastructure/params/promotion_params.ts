export interface CreatePromotionParams {
  productId: string;
  variantId?: string;
  title: string;
  description?: string;
  discountPercentage?: number;
  discountAmount?: number;
  startDate: string;
  endDate: string;
  image?: File;
}

export interface UpdatePromotionParams {
  title?: string;
  description?: string;
  discountPercentage?: number;
  discountAmount?: number;
  startDate?: string;
  endDate?: string;
}

export interface RejectPromotionParams {
  reason: string;
}
