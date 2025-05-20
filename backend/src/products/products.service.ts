import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        stock: createProductDto.stock,
        categoryId: createProductDto.categoryId,
      },
      include: { 
        category: true,
        orderItems: true 
      },
    });
  }

  async findAll(filters: ProductFilterDto = {}): Promise<ProductResponseDto[]> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const sortBy = filters.sortBy || 'createdAt';
    const order = filters.order || 'desc';
    const search = filters.search || '';

    return this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        name: { contains: search, mode: 'insensitive' },
      },
      orderBy: { 
        [sortBy]: order 
      },
      include: { 
        category: true,
        orderItems: true 
      },
    });
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { 
        category: true, 
        orderItems: true 
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: { 
        category: true,
        orderItems: true 
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}