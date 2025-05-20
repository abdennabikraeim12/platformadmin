import { apiClient } from './apiClient';
import { 
  Product, 
  ProductFilterParams, 
  CreateProductDto, 
  UpdateProductDto 
} from '../types/product';

export const ProductApi = {
  getAll: (params?: ProductFilterParams) => 
    apiClient.get<Product[]>('/products', { params }).then(res => res.data),

  getById: (id: number) => 
    apiClient.get<Product>(`/products/${id}`).then(res => res.data),

  create: (product: CreateProductDto) => 
    apiClient.post<Product>('/products', product).then(res => res.data),

  update: (id: number, product: UpdateProductDto) => 
    apiClient.patch<Product>(`/products/${id}`, product).then(res => res.data),

  delete: (id: number) => 
    apiClient.delete(`/products/${id}`).then(res => res.data),

  getBestSellers: () => 
    apiClient.get<Product[]>('/products/best-sellers').then(res => res.data),
};