import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category | null>;
    create(category: Partial<Category>): Promise<Category>;
    update(id: number, category: Partial<Category>): Promise<Category | null>;
    remove(id: number): Promise<void>;
}
