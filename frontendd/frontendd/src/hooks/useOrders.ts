
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../api/orderApi';

export function useOrders(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ['orders', page, limit],
    queryFn: () => orderApi.getOrders(page, limit),
  });
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.getOrder(id),
    enabled: !!id, 
  });
}

export function useMonthlySales(year: number = new Date().getFullYear()) {
  return useQuery({
    queryKey: ['sales', 'monthly', year],
    queryFn: () => orderApi.getMonthlySales(year),
  });
}
