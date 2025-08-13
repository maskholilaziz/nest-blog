import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FindOneUserRequestDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  idNumber?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class FindOneUserResponseDto {
  @Expose()
  idNumber: string;

  @Expose()
  idType: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  birthdate: Date;
}