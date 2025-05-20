import { Category } from '../../categories/interfaces/category.interface';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}