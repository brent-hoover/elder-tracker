import { Elder } from '../elders/elder.entity';
import { StatusUpdate } from '../status-updates/status-update.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    assignedElders: Elder[];
    statusUpdates: StatusUpdate[];
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
