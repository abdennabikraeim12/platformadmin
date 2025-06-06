
export class OrderStatsDto {
  daily: SalesStatsDto[];
  weekly: SalesStatsDto[];
  monthly: SalesStatsDto[];
}
export class SalesStatsDto{
  period: string;
  totalSales: number;
  orderCount: number;
  topProducts: {
    productId: number;
    name: string;
    sales: number;
  }[];
}
