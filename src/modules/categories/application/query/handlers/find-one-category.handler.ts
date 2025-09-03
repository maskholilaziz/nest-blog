import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CATEGORY_REPO_TYPES } from '@/modules/categories/infrastructure/database/repositories/repository.types';
import { CategoryRepository } from '@/modules/categories/infrastructure/database/repositories/category.repository';
import { FindOneCategoryQuery } from '../impl/find-one-category.query';
import { Category } from '@/modules/categories/domain/category.model';

@QueryHandler(FindOneCategoryQuery)
export class FindOneCategoryHandler
  implements IQueryHandler<FindOneCategoryQuery, Category>
{
  constructor(
    @Inject(CATEGORY_REPO_TYPES.repositories.CategoryRepository)
    private repo: CategoryRepository,
  ) {}

  async execute({ id }: FindOneCategoryQuery): Promise<Category> {
    const c = await this.repo.findOneById(id);
    if (!c) throw new NotFoundException('Category not found');
    return c;
  }
}
