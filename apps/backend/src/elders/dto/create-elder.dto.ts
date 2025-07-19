import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateElderDto {
  @ApiProperty({ example: 'Mary', description: "Elder's first name" })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Smith', description: "Elder's last name" })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    example: '1945-06-15',
    description: "Elder's date of birth",
  })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiPropertyOptional({
    example: '123 Main St, Springfield',
    description: "Elder's address",
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: "Elder's phone number",
  })
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid format (e.g., +1234567890)',
  })
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: 'John Smith (Son)',
    description: 'Emergency contact name and relationship',
  })
  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @ApiPropertyOptional({
    example: '+1987654321',
    description: 'Emergency contact phone number',
  })
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Emergency phone must be a valid format (e.g., +1234567890)',
  })
  @IsOptional()
  emergencyContactPhone?: string;

  @ApiPropertyOptional({
    example: 'Diabetes Type 2, Hypertension',
    description: 'Medical notes and conditions',
  })
  @IsString()
  @IsOptional()
  medicalNotes?: string;
}
