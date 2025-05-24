import { Controller, Get, Post, Body, Param, Patch, Delete, Query, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    return this.productsService.create(createProductDto);
  }


@Get()
async findAll(
  @Query() filters: ProductFilterDto
): Promise<PaginatedResponseDto<ProductResponseDto>> {
  return this.productsService.findAll(filters);
}


  @Get('low-stock')
async findLowStock(): Promise<ProductResponseDto[]> {
  return this.productsService.findLowStock();
}

 @Get(':id')
async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
  const product = await this.productsService.findOne(+id);
  if (!product) {
    throw new NotFoundException(`Product with ID ${id} not found`);
  }
  return product;
}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(+id);
  }
}
