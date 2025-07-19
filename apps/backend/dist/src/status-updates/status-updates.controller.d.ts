import { StatusUpdatesService } from './status-updates.service';
import { CreateStatusUpdateDto } from './dto/create-status-update.dto';
import { UpdateStatusUpdateDto } from './dto/update-status-update.dto';
import { FilterStatusUpdateDto } from './dto/filter-status-update.dto';
import { StatusUpdate } from './status-update.entity';
export declare class StatusUpdatesController {
    private readonly statusUpdatesService;
    constructor(statusUpdatesService: StatusUpdatesService);
    create(createStatusUpdateDto: CreateStatusUpdateDto, req: Express.Request & {
        user: {
            userId: string;
        };
    }): Promise<StatusUpdate>;
    findAll(filters: FilterStatusUpdateDto): Promise<StatusUpdate[]>;
    findByElder(elderId: string, req: Express.Request & {
        user: {
            userId: string;
        };
    }): Promise<StatusUpdate[]>;
    findOne(id: string, req: Express.Request & {
        user: {
            userId: string;
        };
    }): Promise<StatusUpdate>;
    update(id: string, updateStatusUpdateDto: UpdateStatusUpdateDto, req: Express.Request & {
        user: {
            userId: string;
        };
    }): Promise<StatusUpdate>;
    remove(id: string, req: Express.Request & {
        user: {
            userId: string;
        };
    }): Promise<void>;
}
