import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryRequestDto {
  @IsNotEmpty() @IsString() name: string;
  @IsOptional() @IsString() description?: string;
}

export class UpdateCategoryRequestDto extends PartialType(
  CreateCategoryRequestDto,
) {}

export class CategoryResponseDto {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() slug: string;
  @Expose() description?: string | null;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}
