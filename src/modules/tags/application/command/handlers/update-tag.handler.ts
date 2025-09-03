import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TAG_REPO_TYPES } from '@/modules/tags/infrastructure/database/repositories/repository.types';
import { TagRepository } from '@/modules/tags/infrastructure/database/repositories/tag.repository';
import { UpdateTagCommand } from '../impl/update-tag.command';

@CommandHandler(UpdateTagCommand)
export class UpdateTagHandler implements ICommandHandler<UpdateTagCommand> {
  constructor(
    @Inject(TAG_REPO_TYPES.repositories.TagRepository)
    private repo: TagRepository,
  ) {}

  async execute({ id, payload }: UpdateTagCommand) {
    const current = await this.repo.findOneById(id);
    if (!current) throw new NotFoundException('Tag not found');

    current.update({
      name: payload.name ?? current.name,
      slug: payload.slug ?? current.slug,
    });

    return this.repo.update(current);
  }
}
