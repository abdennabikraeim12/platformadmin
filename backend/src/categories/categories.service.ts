import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { StockDistributionDto } from './dto/stock-distribution.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    return this.prisma.category.findMany();
  }

  async findOne(id: number): Promise<CategoryResponseDto | null> {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }
async getStockDistribution(): Promise<StockDistributionDto[]> {
  const results = await this.prisma.$queryRaw<StockDistributionDto[]>`
    SELECT 
      c.id as "categoryId",
      c.name as "categoryName",
      COALESCE(SUM(p.stock)::integer, 0) as "totalStock",
      COUNT(p.id)::integer as "productCount"
    FROM "Category" c
    LEFT JOIN "Product" p ON c.id = p."categoryId"
    GROUP BY c.id
    ORDER BY "totalStock" DESC
  `;
  return results;
}
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto> {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

 async remove(id: number): Promise<void> {
  return this.prisma.$transaction(async (prisma) => {
    await prisma.category.delete({ where: { id } });
  });
}
}
