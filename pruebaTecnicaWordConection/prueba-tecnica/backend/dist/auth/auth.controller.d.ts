import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: number;
            email: string;
            role: import("../entities/user.entity").UserRole;
            isActive: boolean;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: number;
            email: string;
            role: import("../entities/user.entity").UserRole;
            isActive: boolean;
        };
        token: string;
    }>;
    getProfile(req: any): any;
}
