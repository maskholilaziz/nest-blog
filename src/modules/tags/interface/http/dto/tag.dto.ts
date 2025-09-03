import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTagRequestDto {
  @IsNotEmpty() @IsString() name: string;
}

export class UpdateTagRequestDto extends PartialType(CreateTagRequestDto) {}

export class TagResponseDto {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() slug: string;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}
