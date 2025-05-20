declare class OrderItemDto {
    productId: number;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    items: OrderItemDto[];
}
export {};
