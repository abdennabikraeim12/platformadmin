import { useQuery } from '@tanstack/react-query';
import { fetchSalesStats, fetchStockStats } from '../api/statisticsApi';

export interface SalesStats {
  productId: string;
  month: string;
  sales: number;
}

export interface StockStats {
  categoryId: string;
  stock: number;
}

export function useSalesStats() {
  return useQuery<SalesStats[], Error>({
    queryKey: ['salesStats'],
    queryFn: fetchSalesStats,
    staleTime: 5 * 60 * 1000, 
  });
}


export function useStockStats() {
  return useQuery<StockStats[], Error>({
    queryKey: ['stockStats'],
    queryFn: fetchStockStats,
    staleTime: 5 * 60 * 1000,
  });
}
