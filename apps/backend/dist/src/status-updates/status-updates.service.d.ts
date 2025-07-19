import { Repository } from 'typeorm';
import { StatusUpdate } from './status-update.entity';
import { CreateStatusUpdateDto } from './dto/create-status-update.dto';
import { UpdateStatusUpdateDto } from './dto/update-status-update.dto';
import { FilterStatusUpdateDto } from './dto/filter-status-update.dto';
import { UsersService } from '../users/users.service';
import { EldersService } from '../elders/elders.service';
export declare class StatusUpdatesService {
    private statusUpdatesRepository;
    private usersService;
    private eldersService;
    constructor(statusUpdatesRepository: Repository<StatusUpdate>, usersService: UsersService, eldersService: EldersService);
    create(createStatusUpdateDto: CreateStatusUpdateDto, userId: string): Promise<StatusUpdate>;
    findAll(filters?: FilterStatusUpdateDto): Promise<StatusUpdate[]>;
    findByElder(elderId: string, userId: string): Promise<StatusUpdate[]>;
    findOne(id: string, userId: string): Promise<StatusUpdate>;
    update(id: string, updateStatusUpdateDto: UpdateStatusUpdateDto, userId: string): Promise<StatusUpdate>;
    remove(id: string, userId: string): Promise<void>;
}
