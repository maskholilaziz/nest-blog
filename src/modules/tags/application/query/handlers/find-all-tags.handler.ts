import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TAG_REPO_TYPES } from '@/modules/tags/infrastructure/database/repositories/repository.types';
import { TagRepository } from '@/modules/tags/infrastructure/database/repositories/tag.repository';
import { FindAllTagsQuery } from '../impl/find-all-tags.query';
import { Tag } from '@/modules/tags/domain/tag.model';

@QueryHandler(FindAllTagsQuery)
export class FindAllTagsHandler
  implements IQueryHandler<FindAllTagsQuery, Tag[]>
{
  constructor(
    @Inject(TAG_REPO_TYPES.repositories.TagRepository)
    private repo: TagRepository,
  ) {}

  execute(): Promise<Tag[]> {
    return this.repo.findAll();
  }
}
