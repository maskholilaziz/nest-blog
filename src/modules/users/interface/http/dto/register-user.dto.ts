import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString, Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export enum IdType {
  WNI = '01',
  WNA = '02',
}

@ValidatorConstraint({ name: 'IsPhoneNumber', async: false })
export class IsPhoneNumberValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    // Format harus dimulai dengan 1-4 digit angka diikuti simbol + diikuti 6-15 digit angka
    if (!/^\d{1,4}\+\d{6,15}$/.test(value)) {
      return false;
    }
    return true;
  }

  defaultMessage(): string {
    return 'invalid phone number';
  }
}

export class RegisterUserRequestDto {
  @IsNotEmpty()
  @IsString()
  idNumber: string;

  @IsNotEmpty()
  @IsEnum(IdType)
  idType: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Validate(IsPhoneNumberValidator)
  phoneNumber: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  birthdate: Date;
}

export class RegisterUserResponseDto {
  @Expose()
  idNumber: string;
  @Expose()
  idType: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
}