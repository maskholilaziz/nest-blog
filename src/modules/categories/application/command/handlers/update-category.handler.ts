import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CATEGORY_REPO_TYPES } from '@/modules/categories/infrastructure/database/repositories/repository.types';
import { CategoryRepository } from '@/modules/categories/infrastructure/database/repositories/category.repository';
import { UpdateCategoryCommand } from '../impl/update-category.command';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(
    @Inject(CATEGORY_REPO_TYPES.repositories.CategoryRepository)
    private repo: CategoryRepository,
  ) {}

  async execute({ id, payload }: UpdateCategoryCommand) {
    const current = await this.repo.findOneById(id);
    if (!current) throw new NotFoundException('Category not found');

    current.update({
      name: payload.name ?? current.name,
      slug: payload.slug ?? current.slug,
      description:
        typeof payload.description !== 'undefined'
          ? payload.description
          : current.description,
    });

    return this.repo.update(current);
  }
}
