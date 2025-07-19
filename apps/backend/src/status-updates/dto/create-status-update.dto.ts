import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsUUID,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateType } from '../enums/update-type.enum';

export class CreateStatusUpdateDto {
  @ApiProperty({
    enum: UpdateType,
    example: UpdateType.GENERAL_OBSERVATION,
    description: 'Type of status update',
  })
  @IsEnum(UpdateType)
  @IsNotEmpty()
  type: UpdateType;

  @ApiProperty({
    example: 'Elder seemed in good spirits today and ate all meals',
    description: 'Detailed description of the observation or event',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    example: '2024-01-15T10:30:00Z',
    description: 'When the event occurred (defaults to current time)',
  })
  @IsDateString()
  @IsOptional()
  eventDate?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID of the elder this update is for',
  })
  @IsUUID()
  @IsNotEmpty()
  elderId: string;
}
