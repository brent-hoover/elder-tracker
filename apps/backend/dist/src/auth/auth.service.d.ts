import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<Omit<User, 'password' | 'hashPassword' | 'validatePassword'> | null>;
    login(user: User): AuthResponseDto;
    register(createUserDto: CreateUserDto): Promise<AuthResponseDto>;
    getUserById(userId: string): Promise<User>;
}
