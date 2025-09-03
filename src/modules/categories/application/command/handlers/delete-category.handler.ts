import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CATEGORY_REPO_TYPES } from '@/modules/categories/infrastructure/database/repositories/repository.types';
import { CategoryRepository } from '@/modules/categories/infrastructure/database/repositories/category.repository';
import { DeleteCategoryCommand } from '../impl/delete-category.command';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler
  implements ICommandHandler<DeleteCategoryCommand>
{
  constructor(
    @Inject(CATEGORY_REPO_TYPES.repositories.CategoryRepository)
    private repo: CategoryRepository,
  ) {}

  async execute({ id }: DeleteCategoryCommand) {
    const current = await this.repo.findOneById(id);
    if (!current) throw new NotFoundException('Category not found');
    await this.repo.remove(id);
    return true;
  }
}
