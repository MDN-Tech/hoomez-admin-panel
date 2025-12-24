export type PromotionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled"
  | "expired";

export interface Promotion {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  description?: string;
  image?: string;
  discountPercentage?: number;
  discountAmount?: number;
  startDate: string;
  endDate: string;
  status: PromotionStatus;
  rejectionReason?: string;
  supplierId: string;
  supplierName: string;
  supplierEmail: string;
  price: number;
  productName: string;
}
