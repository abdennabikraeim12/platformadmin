
import apiClient from './apiClient';
import { Product, ProductsRequestParams, ProductsResponse } from '../types/product';

export const productApi = {
  // Get products with filtering, sorting, and pagination
  getProducts: async (params: ProductsRequestParams): Promise<ProductsResponse> => {
    const response = await apiClient.get('/api/products', { params });
    return response.data;
  },

  // Get a single product by ID
  getProduct: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  },

  // Create a new product
  createProduct: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'orderCount'>): Promise<Product> => {
    const response = await apiClient.post('/api/products', product);
    return response.data;
  },

  // Update an existing product
  updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
    const response = await apiClient.patch(`/api/products/${id}`, product);
    return response.data;
  },

  // Delete a product
  deleteProduct: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/products/${id}`);
  },

  // Get products with low stock (special endpoint for stock alerts)
  getLowStockProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get('/api/products/low-stock');
    return response.data;
  }
};
