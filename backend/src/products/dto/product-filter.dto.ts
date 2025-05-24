import { Type } from 'class-transformer';
import { IsOptional, IsEnum, IsNumber, Min } from 'class-validator';

export enum ProductSortBy {
  NAME = 'name',
  PRICE = 'price',
  STOCK = 'stock',
  CATEGORY = 'category',
  CREATED_AT = 'createdAt',
  ORDER_COUNT = 'orderCount',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class ProductFilterDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 10;

 @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number) 
  categoryId?: number;

  @IsOptional()
  @IsEnum(ProductSortBy)
  sortBy?: ProductSortBy = ProductSortBy.CREATED_AT;

  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder = SortOrder.DESC;

  @IsOptional()
  search?: string;
}
