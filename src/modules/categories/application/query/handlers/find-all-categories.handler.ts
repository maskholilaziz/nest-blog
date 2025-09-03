import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CATEGORY_REPO_TYPES } from '@/modules/categories/infrastructure/database/repositories/repository.types';
import { CategoryRepository } from '@/modules/categories/infrastructure/database/repositories/category.repository';
import { FindAllCategoriesQuery } from '../impl/find-all-categories.query';
import { Category } from '@/modules/categories/domain/category.model';

@QueryHandler(FindAllCategoriesQuery)
export class FindAllCategoriesHandler
  implements IQueryHandler<FindAllCategoriesQuery, Category[]>
{
  constructor(
    @Inject(CATEGORY_REPO_TYPES.repositories.CategoryRepository)
    private repo: CategoryRepository,
  ) {}

  execute(): Promise<Category[]> {
    return this.repo.findAll();
  }
}
