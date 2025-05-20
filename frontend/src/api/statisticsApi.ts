import { apiClient } from "./apiClient";

export interface SalesStats {
  productId: string;
  month: string;  
  sales: number;
}

export interface StockStats {
  categoryId: string;
  stock: number;
}

export const fetchSalesStats = async (): Promise<SalesStats[]> => {
  const { data } = await apiClient.get<SalesStats[]>("/statistics/sales");
  return data;
};

export const fetchStockStats = async (): Promise<StockStats[]> => {
  const { data } = await apiClient.get<StockStats[]>("/statistics/stock");
  return data;
};
