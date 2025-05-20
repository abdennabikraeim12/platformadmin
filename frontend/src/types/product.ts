import { OrderItem } from "./order";

export interface Category {
  id: number;
  name: string;
  createdAt: Date;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  orderItems?: OrderItem[]; 
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  id: number;
}

export interface ProductFilterParams {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'stock' | 'price' | 'category.name';
  order?: 'asc' | 'desc';
  search?: string;
}

export interface BestSellingProduct {
  productId: number;
  name: string;
  totalSales: number;
}

export interface ProductStockAlert {
  productId: number;
  name: string;
  currentStock: number;
  monthlyAverage: number;
  deficit: number;
}