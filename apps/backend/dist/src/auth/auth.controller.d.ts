import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User } from '../users/user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: Express.Request & {
        user: User;
    }): AuthResponseDto;
    register(createUserDto: CreateUserDto): Promise<AuthResponseDto>;
    getProfile(req: Express.Request & {
        user: {
            userId: string;
            email: string;
            isAdmin: boolean;
        };
    }): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        isAdmin: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
