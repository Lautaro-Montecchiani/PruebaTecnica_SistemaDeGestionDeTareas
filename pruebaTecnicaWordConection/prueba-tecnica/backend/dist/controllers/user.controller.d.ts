import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    create(user: Partial<User>): Promise<User>;
    update(id: number, user: Partial<User>): Promise<User | null>;
    remove(id: number): Promise<void>;
}
