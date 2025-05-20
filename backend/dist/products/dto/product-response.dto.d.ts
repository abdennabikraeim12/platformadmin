export declare class ProductResponseDto {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: {
        id: number;
        name: string;
    };
    createdAt: Date;
    updatedAt: Date;
    orderItems?: Array<{
        id: number;
        quantity: number;
        price: number;
        orderId: number;
    }>;
}
