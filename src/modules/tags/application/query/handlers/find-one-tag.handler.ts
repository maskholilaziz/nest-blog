import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TAG_REPO_TYPES } from '@/modules/tags/infrastructure/database/repositories/repository.types';
import { TagRepository } from '@/modules/tags/infrastructure/database/repositories/tag.repository';
import { FindOneTagQuery } from '../impl/find-one-tag.query';
import { Tag } from '@/modules/tags/domain/tag.model';

@QueryHandler(FindOneTagQuery)
export class FindOneTagHandler implements IQueryHandler<FindOneTagQuery, Tag> {
  constructor(
    @Inject(TAG_REPO_TYPES.repositories.TagRepository)
    private repo: TagRepository,
  ) {}

  async execute({ id }: FindOneTagQuery): Promise<Tag> {
    const c = await this.repo.findOneById(id);
    if (!c) throw new NotFoundException('Tag not found');
    return c;
  }
}
