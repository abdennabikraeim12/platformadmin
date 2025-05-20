class OrderItemResponseDto {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export class OrderResponseDto {
  id: number;
  items: OrderItemResponseDto[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}