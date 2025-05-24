
export interface Product {
  id: number;
  name: string;
description: string | null;
  price: number;
  stock: number;
  category: Category;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  orderCount: number; 
  orderItems?: OrderItem[];
}

export interface Category {
  id: number;
  name: string;
  products?: Product[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
}

export interface ProductsRequestParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: 'name' | 'stock' | 'category' | 'orderCount';
  sortOrder?: 'asc' | 'desc';
  categoryId?: number;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
