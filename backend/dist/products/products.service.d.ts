import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<ProductResponseDto>;
    findAll(filters?: ProductFilterDto): Promise<ProductResponseDto[]>;
    findOne(id: number): Promise<ProductResponseDto>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<ProductResponseDto>;
    remove(id: number): Promise<void>;
}
