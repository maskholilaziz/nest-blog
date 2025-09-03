import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CATEGORY_REPO_TYPES } from '@/modules/categories/infrastructure/database/repositories/repository.types';
import { CategoryRepository } from '@/modules/categories/infrastructure/database/repositories/category.repository';
import { CreateCategoryCommand } from '../impl/create-category.command';
import { Category } from '@/modules/categories/domain/category.model';
import { slugify } from '@/common/utils/slugify.util';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand, Category>
{
  constructor(
    @Inject(CATEGORY_REPO_TYPES.repositories.CategoryRepository)
    private repo: CategoryRepository,
  ) {}

  async execute({ payload }: CreateCategoryCommand): Promise<Category> {
    // slug kini di-generate dari name (trim + normalisasi)
    const slugCandidate = slugify(payload.name);
    if (!slugCandidate) throw new BadRequestException('Invalid name');

    // tetap boleh validasi unik sebelum insert
    if (await this.repo.isSlugExists(slugCandidate)) {
      throw new BadRequestException('Slug already used');
    }

    const model = Category.create({
      name: payload.name,
      description: payload.description,
    });
    return this.repo.save(model);
  }
}
