import type {
  DashboardData,
  DashboardMetrics,
} from "../../domain/entities/dashboard_data_entity";

export interface DashboardDataResponse {
  daily: {
    totalProducts: number;
    totalPendingOrders: number;
    totalSales: number;
    totalOrders: number;
  };
  weekly: {
    totalProducts: number;
    totalPendingOrders: number;
    totalSales: number;
    totalOrders: number;
  };
  monthly: {
    totalProducts: number;
    totalPendingOrders: number;
    totalSales: number;
    totalOrders: number;
  };
}

// Function to map API response to domain entity
export function toDomain(apiData: DashboardDataResponse): DashboardData {
  return {
    daily: mapMetricsToDomain(apiData.daily),
    weekly: mapMetricsToDomain(apiData.weekly),
    monthly: mapMetricsToDomain(apiData.monthly),
  };
}

// Helper function to map metrics
function mapMetricsToDomain(
  apiMetrics: DashboardDataResponse["daily"],
): DashboardMetrics {
  return {
    totalProducts: apiMetrics.totalProducts,
    totalPendingOrders: apiMetrics.totalPendingOrders,
    totalSales: apiMetrics.totalSales,
    totalOrders: apiMetrics.totalOrders,
  };
}
