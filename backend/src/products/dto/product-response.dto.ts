export class ProductResponseDto {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: {
    id: number;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
  orderCount: number;
  orderItems?: Array<{
    id: number;
    quantity: number;
    price: number;
    orderId: number;
  }>;
}
