import { User } from '../users/user.entity';
import { Elder } from '../elders/elder.entity';
import { UpdateType } from './enums/update-type.enum';
export declare class StatusUpdate {
    id: string;
    type: UpdateType;
    description: string;
    eventDate: Date;
    createdBy: User;
    elder: Elder;
    createdAt: Date;
    updatedAt: Date;
}
