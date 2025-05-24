
import apiClient from './apiClient';
import { Category, CategoryStockData } from '../types/category';

export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get('/api/categories');
    return response.data;
  },

  getCategory: async (id: number): Promise<Category> => {
    const response = await apiClient.get(`/api/categories/${id}`);
    return response.data;
  },

  createCategory: async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
    const response = await apiClient.post('/api/categories', category);
    return response.data;
  },

  updateCategory: async (id: number, category: Partial<Category>): Promise<Category> => {
    const response = await apiClient.put(`/api/categories/${id}`, category);
    return response.data;
  },

  deleteCategory: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/categories/${id}`);
  },

  getCategoryStockDistribution: async (): Promise<CategoryStockData[]> => {
    const response = await apiClient.get('/api/categories/stock-distribution');
    return response.data;
  }
};
