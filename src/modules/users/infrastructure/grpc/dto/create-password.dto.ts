import { IsString } from 'class-validator';

export class CreatePasswordRequestDto {
  @IsString()
  userId: string;

  @IsString()
  idNumber: string;

  @IsString()
  password: string;
}