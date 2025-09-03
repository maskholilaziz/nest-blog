import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOnePostQuery } from '../impl/find-one-post.query';
import { PostRepositoryImpl } from '@/modules/posts/infrastructure/database/repositories/post.repository.impl';
import { NotFoundException } from '@nestjs/common';
import { PostEntity } from '@/modules/posts/infrastructure/database/entities/post.entity';

@QueryHandler(FindOnePostQuery)
export class FindOnePostHandler
  implements IQueryHandler<FindOnePostQuery, PostEntity>
{
  constructor(private readonly repo: PostRepositoryImpl) {}

  async execute({ id }: FindOnePostQuery): Promise<PostEntity> {
    const e = await this.repo.findOneById(id, true);
    if (!e) throw new NotFoundException('Post not found');
    return e;
  }
}
