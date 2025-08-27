import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, AdminRegisterDto } from '../dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../entities/user.entity").UserRole;
            isActive: boolean;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../entities/user.entity").UserRole;
            isActive: boolean;
        };
        token: string;
    }>;
    getProfile(req: any): any;
    registerAdmin(adminRegisterDto: AdminRegisterDto): Promise<{
        token: string;
        user: import("../entities/user.entity").User;
    }>;
}
