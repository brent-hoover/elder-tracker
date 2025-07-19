import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { UpdateType } from '../enums/update-type.enum';

export class CreateStatusUpdateDto {
  @IsEnum(UpdateType)
  @IsNotEmpty()
  type: UpdateType;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsOptional()
  eventDate?: string;

  @IsUUID()
  @IsNotEmpty()
  elderId: string;
}
