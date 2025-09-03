import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPostsQuery } from '../impl/find-posts.query';
import { PostRepositoryImpl } from '@/modules/posts/infrastructure/database/repositories/post.repository.impl';
import { PostEntity } from '@/modules/posts/infrastructure/database/entities/post.entity';

@QueryHandler(FindPostsQuery)
export class FindPostsHandler
  implements IQueryHandler<FindPostsQuery, PostEntity[]>
{
  constructor(private readonly repo: PostRepositoryImpl) {}

  execute(): Promise<PostEntity[]> {
    return this.repo.findAll(true);
  }
}
