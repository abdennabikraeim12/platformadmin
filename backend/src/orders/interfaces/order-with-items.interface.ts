import { Product, OrderItem } from '@prisma/client';

export interface OrderWithItems {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  items: (OrderItem & { product: Product })[];
}