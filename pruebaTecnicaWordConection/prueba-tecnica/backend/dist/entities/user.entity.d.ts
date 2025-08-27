export declare enum UserRole {
    USER = "user",
    PREMIUM = "premium",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
}
