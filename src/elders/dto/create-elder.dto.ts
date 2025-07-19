import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  Matches,
} from 'class-validator';

export class CreateElderDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid format (e.g., +1234567890)',
  })
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Emergency phone must be a valid format (e.g., +1234567890)',
  })
  @IsOptional()
  emergencyContactPhone?: string;

  @IsString()
  @IsOptional()
  medicalNotes?: string;
}
