import { UpdateType } from '../enums/update-type.enum';
export declare class CreateStatusUpdateDto {
    type: UpdateType;
    description: string;
    eventDate?: string;
    elderId: string;
}
