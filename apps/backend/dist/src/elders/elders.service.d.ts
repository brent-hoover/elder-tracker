import { Repository } from 'typeorm';
import { Elder } from './elder.entity';
import { User } from '../users/user.entity';
import { CreateElderDto } from './dto/create-elder.dto';
import { UpdateElderDto } from './dto/update-elder.dto';
import { AssignCaregiversDto } from './dto/assign-caregivers.dto';
export declare class EldersService {
    private eldersRepository;
    private usersRepository;
    constructor(eldersRepository: Repository<Elder>, usersRepository: Repository<User>);
    create(createElderDto: CreateElderDto): Promise<Elder>;
    findAll(): Promise<Elder[]>;
    findOne(id: string): Promise<Elder>;
    findByCaregiver(userId: string): Promise<Elder[]>;
    update(id: string, updateElderDto: UpdateElderDto): Promise<Elder>;
    remove(id: string): Promise<void>;
    assignCaregivers(id: string, assignCaregiversDto: AssignCaregiversDto): Promise<Elder>;
    addCaregiver(elderId: string, userId: string): Promise<Elder>;
    removeCaregiver(elderId: string, userId: string): Promise<Elder>;
}
