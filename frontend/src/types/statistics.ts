import { MonthlySales } from "./order";
import { BestSellingProduct, ProductStockAlert } from "./product";

export interface SalesStatistics {
  monthlySales: MonthlySales[];
  bestSellingProducts: BestSellingProduct[];
}

export interface StockStatistics {
  byCategory: Array<{
    categoryId: number;
    categoryName: string;
    totalStock: number;
    productCount: number;
  }>;
  stockAlerts: ProductStockAlert[];
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  monthlyRevenue: number;
  lowStockItems: number;
}