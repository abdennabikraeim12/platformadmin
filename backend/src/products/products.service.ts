import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductFilterDto, ProductSortBy } from './dto/product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private mapProductWithCount(product: any): ProductResponseDto {
    return {
      ...product,
      orderCount: product.orderItems?.length || 0,
      category: {
        id: product.category.id,
        name: product.category.name
      }
    };
  }

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.prisma.product.create({
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
    return this.mapProductWithCount(product);
  }

async findAll(filters: ProductFilterDto): Promise<PaginatedResponseDto<ProductResponseDto>> {
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const sortBy = filters.sortBy || 'createdAt';
  const order = filters.order || 'desc';
  const search = filters.search || '';

  const where: any = {
    name: { contains: search, mode: 'insensitive' }
  };

  if (filters.categoryId) {
    where.categoryId = filters.categoryId;
  }

  // Handle orderCount sorting differently
  if (sortBy === ProductSortBy.ORDER_COUNT) {
    // First get ALL products with their orderItems
    const allProducts = await this.prisma.product.findMany({
      where,
      include: {
        category: true,
        orderItems: true
      }
    });

    // Map to DTOs and sort by orderCount
    const sortedProducts = allProducts
      .map(this.mapProductWithCount)
      .sort((a, b) => order === 'asc' 
        ? a.orderCount - b.orderCount 
        : b.orderCount - a.orderCount);

    // Then apply pagination manually
    const paginatedProducts = sortedProducts.slice(
      (page - 1) * limit,
      page * limit
    );

    return new PaginatedResponseDto(
      paginatedProducts,
      sortedProducts.length, // total count
      page,
      limit
    );
  }

  // Normal case for other sort fields
  const [data, total] = await Promise.all([
    this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where, 
      orderBy: sortBy === ProductSortBy.CATEGORY 
        ? { category: { name: order } }
        : { [sortBy]: order },
      include: { 
        category: true,
        orderItems: true 
      },
    }),
    this.prisma.product.count({ where })
  ]);

  return new PaginatedResponseDto(
    data.map(this.mapProductWithCount),
    total,
    page, 
    limit
  );
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

    return this.mapProductWithCount(product);
  }
  async findLowStock(): Promise<ProductResponseDto[]> {
  const products = await this.prisma.product.findMany({
    where: { stock: { lt: 5 } }, 
    include: { category: true }
  });
  return products.map(this.mapProductWithCount);
}

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    const product = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: { 
        category: true,
        orderItems: true 
      },
    });
    return this.mapProductWithCount(product);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
