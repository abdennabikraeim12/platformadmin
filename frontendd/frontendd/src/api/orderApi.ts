
import apiClient from './apiClient';
import { Order, MonthlySalesData } from '../types/order';

export const orderApi = {
  // Get all orders with pagination
  getOrders: async (page: number = 1, limit: number = 10): Promise<{ data: Order[], total: number }> => {
    const response = await apiClient.get('/api/orders', { params: { page, limit } });
    return response.data;
  },

  // Get a single order by ID
  getOrder: async (id: number): Promise<Order> => {
    const response = await apiClient.get(`/api/orders/${id}`);
    return response.data;
  },

  // Get monthly sales data for products (for line chart)
  getMonthlySales: async (year: number = new Date().getFullYear()): Promise<MonthlySalesData[]> => {
    const response = await apiClient.get('/api/orders/monthly-sales', { params: { year } });
    return response.data;
  }
};
