import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto>;
    findAll(): Promise<CategoryResponseDto[]>;
    findOne(id: string): Promise<CategoryResponseDto | null>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto>;
    remove(id: string): Promise<void>;
}
