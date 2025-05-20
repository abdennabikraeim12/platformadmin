import { useQuery } from '@tanstack/react-query';
import type { Order } from '../types/order';
import { fetchOrders } from '../api/orderApi';

export function useOrders() {
  return useQuery<Order[], Error>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 5 * 60 * 1000, 
  });
}
