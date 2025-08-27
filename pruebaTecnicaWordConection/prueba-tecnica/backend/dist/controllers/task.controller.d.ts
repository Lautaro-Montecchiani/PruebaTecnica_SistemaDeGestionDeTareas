import { TaskService } from '../services/task.service';
import { Task } from '../entities/task.entity';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task | null>;
    create(task: Partial<Task>): Promise<Task>;
    update(id: number, task: Partial<Task>): Promise<Task | null>;
    remove(id: number): Promise<void>;
}
