import { OrderItem } from '@prisma/client';
export interface Order {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    items: OrderItem[];
}
