export class SalesStatsDto {
  period: string;
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  topSellingProducts: {
    productId: number;
    name: string;
    quantitySold: number;
    revenue: number;
  }[];
}