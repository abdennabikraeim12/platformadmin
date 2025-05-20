import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto> {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}