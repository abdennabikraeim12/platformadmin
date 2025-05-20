import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<ProductResponseDto>;
    findAll(filters: ProductFilterDto): Promise<ProductResponseDto[]>;
    findOne(id: string): Promise<ProductResponseDto>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto>;
    remove(id: string): Promise<void>;
}
