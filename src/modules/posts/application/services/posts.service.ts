import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseHelper } from '@/common/helpers/response.helper';
import { MultiLanguageMessageDto } from '@/common/dto/multi-language-message.dto';
import {
  CreatePostRequestDto,
  PostResponseDto,
  UpdatePostRequestDto,
} from '../../interface/http/dto/post.dto';
import { CreatePostCommand } from '../command/impl/create-post.command';
import { UpdatePostCommand } from '../command/impl/update-post.command';
import { DeletePostCommand } from '../command/impl/delete-post.command';
import { FindOnePostQuery } from '../query/impl/find-one-post.query';
import { FindPostsQuery } from '../query/impl/find-posts.query';
import { PostEntity } from '../../infrastructure/database/entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  private toDto(e: PostEntity): PostResponseDto {
    return {
      id: e.id,
      title: e.title,
      slug: e.slug,
      content: e.content,
      category: e.category
        ? { id: e.category.id, name: e.category.name, slug: e.category.slug }
        : null,
      tags: (e.tags || []).map((t) => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
      })),
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  async create(req: CreatePostRequestDto) {
    const saved: PostEntity = await this.commandBus.execute(
      new CreatePostCommand({
        title: req.title,
        content: req.content,
        categoryId: req.categoryId,
        tagIds: req.tagIds || [],
      }),
    );
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Berhasil', 'Success'),
      this.toDto(saved),
    );
  }

  async findAll() {
    const rows: PostEntity[] = await this.queryBus.execute(
      new FindPostsQuery(),
    );
    const data = rows.map((e) => this.toDto(e));
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Data ditemukan', 'Found'),
      data,
    );
  }

  async findOne(id: string) {
    const e: PostEntity = await this.queryBus.execute(new FindOnePostQuery(id));
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Data ditemukan', 'Found'),
      this.toDto(e),
    );
  }

  async update(id: string, req: UpdatePostRequestDto) {
    const saved: PostEntity = await this.commandBus.execute(
      new UpdatePostCommand(id, req),
    );
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Diperbarui', 'Updated'),
      this.toDto(saved),
    );
  }

  async remove(id: string) {
    await this.commandBus.execute(new DeletePostCommand(id));
    return ResponseHelper.success(
      new MultiLanguageMessageDto('Dihapus', 'Deleted'),
    );
  }
}
