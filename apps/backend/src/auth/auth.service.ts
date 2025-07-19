import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<
    User,
    'password' | 'hashPassword' | 'validatePassword'
  > | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await user.validatePassword(password))) {
      const {
        id,
        email: userEmail,
        firstName,
        lastName,
        isActive,
        isAdmin,
        createdAt,
        updatedAt,
        assignedElders,
        statusUpdates,
      } = user;
      return {
        id,
        email: userEmail,
        firstName,
        lastName,
        isActive,
        isAdmin,
        createdAt,
        updatedAt,
        assignedElders,
        statusUpdates,
      };
    }
    return null;
  }

  login(user: User): AuthResponseDto {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      isAdmin: user.isAdmin,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      },
    };
  }

  async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return this.login(user);
  }

  async getUserById(userId: string): Promise<User> {
    return this.usersService.findOne(userId);
  }
}
