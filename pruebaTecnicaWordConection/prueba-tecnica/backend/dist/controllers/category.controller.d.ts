import { CategoryService } from '../services/category.service';
import { Category } from '../entities/category.entity';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category | null>;
    create(category: Partial<Category>): Promise<Category>;
    update(id: number, category: Partial<Category>): Promise<Category | null>;
    remove(id: number): Promise<void>;
}
