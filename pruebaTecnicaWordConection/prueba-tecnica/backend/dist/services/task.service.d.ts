import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { User } from '../entities/user.entity';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<Task>);
    findAll(params: {
        page?: number;
        limit?: number;
        status?: string;
        categoryId?: number;
    }): Promise<{
        data: Task[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<Task | null>;
    create(taskDto: CreateTaskDto): Promise<Task>;
    update(id: number, taskDto: UpdateTaskDto, user: User): Promise<Task | null>;
    remove(id: number, user: User): Promise<void>;
}
