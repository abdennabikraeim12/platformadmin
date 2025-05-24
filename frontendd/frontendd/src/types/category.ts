
export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  productCount?: number;
}

export interface CategoryStockData {
  categoryName: string;
  stockCount: number;
}
