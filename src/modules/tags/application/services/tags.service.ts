import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseHelper } from '@/common/helpers/response.helper';
import { MultiLanguageMessageDto } from '@/common/dto/multi-language-message.dto';
import {
  CreateTagRequestDto,
  UpdateTagRequestDto,
  TagResponseDto,
} from '../../interface/http/dto/tag.dto';
import { CreateTagCommand } from '../command/impl/create-tag.command';
import { UpdateTagCommand } from '../command/impl/update-tag.command';
import { DeleteTagCommand } from '../command/impl/delete-tag.command';
import { FindOneTagQuery } from '../query/impl/find-one-tag.query';
import { FindAllTagsQuery } from '../query/impl/find-all-tags.query';
import { Tag } from '../../domain/tag.model';

@Injectable()
export class TagsService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  private mapToDto(m: Tag): TagResponseDto {
    return {
      id: m.id,
      name: m.name,
      slug: m.slug,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
    };
  }

  async create(req: CreateTagRequestDto) {
    const saved: Tag = await this.commandBus.execute(new CreateTagCommand(req));
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Berhasil', 'Success'),
      this.mapToDto(saved),
    );
  }

  async findAll() {
    const list: Tag[] = await this.queryBus.execute(new FindAllTagsQuery());
    const data = list.map((m) => this.mapToDto(m));
    // Penting: ResponseDto<TagResponseDto[]> untuk list
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Data ditemukan', 'Found'),
      data,
    );
  }

  async findOne(id: string) {
    const m: Tag = await this.queryBus.execute(new FindOneTagQuery(id));
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Data ditemukan', 'Found'),
      this.mapToDto(m),
    );
  }

  async update(id: string, req: UpdateTagRequestDto) {
    const updated: Tag = await this.commandBus.execute(
      new UpdateTagCommand(id, req),
    );
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Diperbarui', 'Updated'),
      this.mapToDto(updated),
    );
  }

  async remove(id: string) {
    await this.commandBus.execute(new DeleteTagCommand(id));
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Dihapus', 'Deleted'),
    );
  }
}
