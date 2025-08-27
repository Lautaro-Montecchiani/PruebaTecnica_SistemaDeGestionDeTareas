import { User } from './user.entity';
import { Task } from './task.entity';
export declare class TaskGroup {
    id: number;
    name: string;
    owner: User;
    tasks: Task[];
}
