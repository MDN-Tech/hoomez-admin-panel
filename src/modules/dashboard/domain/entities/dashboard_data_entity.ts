export interface DashboardMetrics {
  totalProducts: number;
  totalPendingOrders: number;
  totalSales: number;
  totalOrders: number;
}

export interface DashboardData {
  daily: DashboardMetrics;
  weekly: DashboardMetrics;
  monthly: DashboardMetrics;
}
