import { DollarSign, Package, ShoppingCart, Clock } from "lucide-react";

import { useGetDashBoardData } from "../hooks/useGetDashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardMetrics } from "../../domain/entities/dashboard_data_entity";

export default function DashboardPage() {
  const { data, isLoading, error } = useGetDashBoardData();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="space-y-2 text-center">
          <p className="text-destructive text-lg font-medium">
            Failed to load dashboard data
          </p>
          <p className="text-muted-foreground text-sm">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="space-y-4">
          <MetricsGrid metrics={data.daily} />
        </TabsContent>
        <TabsContent value="weekly" className="space-y-4">
          <MetricsGrid metrics={data.weekly} />
        </TabsContent>
        <TabsContent value="monthly" className="space-y-4">
          <MetricsGrid metrics={data.monthly} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricsGrid({ metrics }: { metrics: DashboardMetrics }) {
  // Check if metrics exist to avoid crash if API returns partial data
  if (!metrics) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${metrics.totalSales.toLocaleString()}
          </div>
          <p className="text-muted-foreground text-xs">
            Total revenue for this period
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
          <ShoppingCart className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{metrics.totalOrders}</div>
          <p className="text-muted-foreground text-xs">Total orders placed</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          <Clock className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalPendingOrders}</div>
          <p className="text-muted-foreground text-xs">
            Orders awaiting processing
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Products</CardTitle>
          <Package className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalProducts}</div>
          <p className="text-muted-foreground text-xs">
            Products currently listed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-9 w-37.5" />
      </div>
      <div className="space-y-4">
        <Skeleton className="w-[200p x] h-9" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-25" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="mb-2 h-8 w-15" />
                  <Skeleton className="h-3 w-30" />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
