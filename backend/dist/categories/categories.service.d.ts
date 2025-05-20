import { PrismaService } from 'prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto>;
    findAll(): Promise<CategoryResponseDto[]>;
    findOne(id: number): Promise<CategoryResponseDto | null>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<CategoryResponseDto>;
    remove(id: number): Promise<void>;
}
