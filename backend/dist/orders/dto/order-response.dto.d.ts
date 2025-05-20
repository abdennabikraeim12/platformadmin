declare class OrderItemResponseDto {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    total: number;
}
export declare class OrderResponseDto {
    id: number;
    items: OrderItemResponseDto[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
}
export {};
