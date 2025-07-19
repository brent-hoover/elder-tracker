import { IsArray, IsUUID } from 'class-validator';

export class AssignCaregiversDto {
  @IsArray()
  @IsUUID('4', { each: true })
  userIds: string[];
}
