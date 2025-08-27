import { Repository } from 'typeorm';
import { TaskGroup } from '../entities/task-group.entity';
import { User } from '../entities/user.entity';
export declare class TaskGroupService {
    private readonly groupRepo;
    private readonly userRepo;
    constructor(groupRepo: Repository<TaskGroup>, userRepo: Repository<User>);
    create(name: string, ownerId: number): Promise<TaskGroup>;
    findAllByOwner(ownerId: number): Promise<TaskGroup[]>;
    remove(id: number, ownerId: number): Promise<void>;
}
