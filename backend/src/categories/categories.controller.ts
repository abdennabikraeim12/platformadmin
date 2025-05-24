import { Controller, Get, Post, Body, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { StockDistributionDto } from './dto/stock-distribution.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
    return this.categoriesService.create(createCategoryDto);
  }
@Get('stock-distribution')
  getStockDistribution(): Promise<StockDistributionDto[]> {
    return this.categoriesService.getStockDistribution();
  }
  @Get()
  findAll(): Promise<CategoryResponseDto[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoryResponseDto | null> {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
async remove(@Param('id') id: string) {
  try {
    await this.categoriesService.remove(+id);
    return { message: 'Category deleted successfully' };
  } catch (error) {
    throw new HttpException(
      error.message || 'Failed to delete category',
      HttpStatus.BAD_REQUEST
    );
  }
}
}
