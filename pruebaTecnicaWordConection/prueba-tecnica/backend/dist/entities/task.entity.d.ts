import { User } from './user.entity';
import { Category } from './category.entity';
import { TaskGroup } from './task-group.entity';
export declare enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed"
}
export declare class Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    user: User;
    category: Category;
    group?: TaskGroup;
}
