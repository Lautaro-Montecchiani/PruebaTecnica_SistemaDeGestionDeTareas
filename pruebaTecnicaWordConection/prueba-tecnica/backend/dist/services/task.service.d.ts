import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<Task>);
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task | null>;
    create(task: Partial<Task>): Promise<Task>;
    update(id: number, task: Partial<Task>): Promise<Task | null>;
    remove(id: number): Promise<void>;
}
