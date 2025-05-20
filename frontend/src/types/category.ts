export interface Category {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  id: number;
}

export interface CategoryWithStats extends Category {
  productCount: number;
  totalStock: number;
}