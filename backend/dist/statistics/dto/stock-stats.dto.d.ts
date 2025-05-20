export declare class StockStatsDto {
    totalProducts: number;
    totalStock: number;
    lowStockItems: {
        productId: number;
        name: string;
        currentStock: number;
    }[];
    outOfStockItems: {
        productId: number;
        name: string;
    }[];
    byCategory: {
        categoryId: number;
        name: string;
        productCount: number;
        totalStock: number;
    }[];
}
