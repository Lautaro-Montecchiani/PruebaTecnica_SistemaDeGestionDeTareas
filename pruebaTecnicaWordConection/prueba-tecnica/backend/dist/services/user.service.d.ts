import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: Partial<User>): Promise<User>;
    update(id: number, user: Partial<User>): Promise<User | null>;
    remove(id: number): Promise<void>;
}
