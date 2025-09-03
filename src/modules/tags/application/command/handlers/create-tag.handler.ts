import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TAG_REPO_TYPES } from '@/modules/tags/infrastructure/database/repositories/repository.types';
import { TagRepository } from '@/modules/tags/infrastructure/database/repositories/tag.repository';
import { CreateTagCommand } from '../impl/create-tag.command';
import { Tag } from '@/modules/tags/domain/tag.model';
import { slugify } from '@/common/utils/slugify.util';

@CommandHandler(CreateTagCommand)
export class CreateTagHandler
  implements ICommandHandler<CreateTagCommand, Tag>
{
  constructor(
    @Inject(TAG_REPO_TYPES.repositories.TagRepository)
    private repo: TagRepository,
  ) {}

  async execute({ payload }: CreateTagCommand): Promise<Tag> {
    // slug kini di-generate dari name (trim + normalisasi)
    const slugCandidate = slugify(payload.name);
    if (!slugCandidate) throw new BadRequestException('Invalid name');

    // tetap boleh validasi unik sebelum insert
    if (await this.repo.isSlugExists(slugCandidate)) {
      throw new BadRequestException('Slug already used');
    }

    const model = Tag.create(payload);
    return this.repo.save(model);
  }
}
