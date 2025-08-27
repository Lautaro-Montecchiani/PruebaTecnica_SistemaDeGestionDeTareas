import { TaskGroupService } from '../services/task-group.service';
import { TaskGroup } from '../entities/task-group.entity';
export declare class TaskGroupController {
    private readonly taskGroupService;
    constructor(taskGroupService: TaskGroupService);
    create(body: {
        name: string;
    }, req: any): Promise<TaskGroup>;
    findAll(req: any): Promise<TaskGroup[]>;
    remove(id: number, req: any): Promise<void>;
}
