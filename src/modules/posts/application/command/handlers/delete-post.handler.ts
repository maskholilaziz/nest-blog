import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from '../impl/delete-post.command';
import { PostRepositoryImpl } from '@/modules/posts/infrastructure/database/repositories/post.repository.impl';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler
  implements ICommandHandler<DeletePostCommand, boolean>
{
  constructor(private readonly repo: PostRepositoryImpl) {}

  async execute({ id }: DeletePostCommand): Promise<boolean> {
    const e = await this.repo.findOneById(id, false);
    if (!e) throw new NotFoundException('Post not found');
    await this.repo.remove(id); // soft delete
    return true;
  }
}
