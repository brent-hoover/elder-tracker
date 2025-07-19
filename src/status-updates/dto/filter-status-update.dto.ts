import { IsEnum, IsUUID, IsDateString, IsOptional } from 'class-validator';
import { UpdateType } from '../enums/update-type.enum';

export class FilterStatusUpdateDto {
  @IsUUID()
  @IsOptional()
  elderId?: string;

  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsEnum(UpdateType)
  @IsOptional()
  type?: UpdateType;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;
}
