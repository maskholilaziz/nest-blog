import {
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePostRequestDto {
  @IsNotEmpty() @IsString() title: string;
  @IsNotEmpty() @IsString() content: string;
  @IsNotEmpty() @IsString() categoryId: string;

  // daftar id tag (boleh kosong)
  @IsArray() @ArrayUnique() @IsString({ each: true }) tagIds: string[] = [];
}

export class UpdatePostRequestDto extends PartialType(CreatePostRequestDto) {
  @IsOptional() categoryId?: string;
  @IsOptional() tagIds?: string[];
}

export class PostResponseDto {
  @Expose() id: string;
  @Expose() title: string;
  @Expose() slug: string;
  @Expose() content: string;
  @Expose() category: { id: string; name: string; slug: string };
  @Expose() tags: Array<{ id: string; name: string; slug: string }>;
  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}
