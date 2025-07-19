import { IsEnum, IsUUID, IsDateString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateType } from '../enums/update-type.enum';

export class FilterStatusUpdateDto {
  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Filter by elder ID',
  })
  @IsUUID()
  @IsOptional()
  elderId?: string;

  @ApiPropertyOptional({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Filter by user/caregiver ID',
  })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    enum: UpdateType,
    example: UpdateType.DOCTOR_VISIT,
    description: 'Filter by update type',
  })
  @IsEnum(UpdateType)
  @IsOptional()
  type?: UpdateType;

  @ApiPropertyOptional({
    example: '2024-01-01T00:00:00Z',
    description: 'Filter updates from this date',
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({
    example: '2024-12-31T23:59:59Z',
    description: 'Filter updates until this date',
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}
