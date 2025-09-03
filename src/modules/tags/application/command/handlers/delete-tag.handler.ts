import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TAG_REPO_TYPES } from '@/modules/tags/infrastructure/database/repositories/repository.types';
import { TagRepository } from '@/modules/tags/infrastructure/database/repositories/tag.repository';
import { DeleteTagCommand } from '../impl/delete-tag.command';

@CommandHandler(DeleteTagCommand)
export class DeleteTagHandler implements ICommandHandler<DeleteTagCommand> {
  constructor(
    @Inject(TAG_REPO_TYPES.repositories.TagRepository)
    private repo: TagRepository,
  ) {}

  async execute({ id }: DeleteTagCommand) {
    const current = await this.repo.findOneById(id);
    if (!current) throw new NotFoundException('Tag not found');
    await this.repo.remove(id);
    return true;
  }
}
