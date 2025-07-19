import { UpdateType } from '../enums/update-type.enum';
export declare class FilterStatusUpdateDto {
    elderId?: string;
    userId?: string;
    type?: UpdateType;
    startDate?: string;
    endDate?: string;
}
