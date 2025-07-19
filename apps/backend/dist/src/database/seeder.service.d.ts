import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
export declare class SeederService implements OnModuleInit {
    private userRepository;
    constructor(userRepository: Repository<User>);
    onModuleInit(): Promise<void>;
    private seedAdminUser;
}
