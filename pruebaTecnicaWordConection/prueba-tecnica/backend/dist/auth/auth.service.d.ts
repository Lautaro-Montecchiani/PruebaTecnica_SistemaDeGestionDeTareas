import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: number;
            email: string;
            role: UserRole;
            isActive: boolean;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: number;
            email: string;
            role: UserRole;
            isActive: boolean;
        };
        token: string;
    }>;
    validateUser(userId: number): Promise<User | null>;
}
