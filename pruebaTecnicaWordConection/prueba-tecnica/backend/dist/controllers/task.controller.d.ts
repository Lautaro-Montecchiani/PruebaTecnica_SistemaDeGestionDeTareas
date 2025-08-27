import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { TaskService } from '../services/task.service';
import { Task } from '../entities/task.entity';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findAll(page?: number, limit?: number, status?: string, categoryId?: number): Promise<{
        data: Task[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<Task | null>;
    create(task: CreateTaskDto): Promise<Task>;
    update(id: number, task: UpdateTaskDto, req: any): Promise<Task | null>;
    remove(id: number, req: any): Promise<void>;
}
