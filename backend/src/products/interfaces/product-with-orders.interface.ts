import { OrderItem, Product } from '@prisma/client';

export interface ProductWithOrders extends Product {
  orderItems: OrderItem[];
}