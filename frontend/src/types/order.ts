import { Product } from './product';

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number; 
}

export interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderDto {
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}

export interface MonthlySales {
  month: string; 
  totalSales: number;
  orderCount: number;
}