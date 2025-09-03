import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseHelper } from '@/common/helpers/response.helper';
import { MultiLanguageMessageDto } from '@/common/dto/multi-language-message.dto';
import {
  CreateCategoryRequestDto,
  UpdateCategoryRequestDto,
  CategoryResponseDto,
} from '../../interface/http/dto/category.dto';
import { CreateCategoryCommand } from '../command/impl/create-category.command';
import { UpdateCategoryCommand } from '../command/impl/update-category.command';
import { DeleteCategoryCommand } from '../command/impl/delete-category.command';
import { FindOneCategoryQuery } from '../query/impl/find-one-category.query';
import { FindAllCategoriesQuery } from '../query/impl/find-all-categories.query';
import { Category } from '../../domain/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  private mapToDto(m: Category): CategoryResponseDto {
    return {
      id: m.id,
      name: m.name,
      slug: m.slug,
      description: m.description ?? null,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
    };
  }

  async create(req: CreateCategoryRequestDto) {
    const saved: Category = await this.commandBus.execute(
      new CreateCategoryCommand(req),
    );
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Berhasil', 'Success'),
      this.mapToDto(saved),
    );
  }

  async findAll() {
    const list: Category[] = await this.queryBus.execute(
      new FindAllCategoriesQuery(),
    );
    const data = list.map((m) => this.mapToDto(m));
    // Penting: ResponseDto<CategoryResponseDto[]> untuk list
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Data ditemukan', 'Found'),
      data,
    );
  }

  async findOne(id: string) {
    const m: Category = await this.queryBus.execute(
      new FindOneCategoryQuery(id),
    );
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Data ditemukan', 'Found'),
      this.mapToDto(m),
    );
  }

  async update(id: string, req: UpdateCategoryRequestDto) {
    const updated: Category = await this.commandBus.execute(
      new UpdateCategoryCommand(id, req),
    );
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Diperbarui', 'Updated'),
      this.mapToDto(updated),
    );
  }

  async remove(id: string) {
    await this.commandBus.execute(new DeleteCategoryCommand(id));
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Dihapus', 'Deleted'),
    );
  }
}
