export declare enum ProductSortBy {
    NAME = "name",
    STOCK = "stock",
    CATEGORY = "category",
    CREATED_AT = "createdAt"
}
export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
export declare class ProductFilterDto {
    page?: number;
    limit?: number;
    sortBy?: ProductSortBy;
    order?: SortOrder;
    search?: string;
}
