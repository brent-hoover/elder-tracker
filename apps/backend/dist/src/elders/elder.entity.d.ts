import { User } from '../users/user.entity';
import { StatusUpdate } from '../status-updates/status-update.entity';
export declare class Elder {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date | null;
    address: string | null;
    phoneNumber: string | null;
    emergencyContact: string | null;
    emergencyContactPhone: string | null;
    medicalNotes: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    caregivers: User[];
    statusUpdates: StatusUpdate[];
}
