import { IsEnum, IsString, IsOptional, IsDateString } from 'class-validator';
import { UpdateType } from '../enums/update-type.enum';

export class UpdateStatusUpdateDto {
  @IsEnum(UpdateType)
  @IsOptional()
  type?: UpdateType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  eventDate?: string;
}
