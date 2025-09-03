import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../impl/create-post.command';
import { PostRepositoryImpl } from '@/modules/posts/infrastructure/database/repositories/post.repository.impl';
import { slugify } from '@/common/utils/slugify.util';
import { PostEntity } from '@/modules/posts/infrastructure/database/entities/post.entity';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler
  implements ICommandHandler<CreatePostCommand, PostEntity>
{
  constructor(private readonly repo: PostRepositoryImpl) {}

  async execute({ payload }: CreatePostCommand): Promise<PostEntity> {
    const slug = (payload.slug?.trim?.() || slugify(payload.title)) as string;
    if (!slug) throw new BadRequestException('Invalid title/slug');

    if (await this.repo.isSlugExists(slug)) {
      throw new BadRequestException('Post slug already used');
    }

    const cat = await this.repo.findCategoryById(payload.categoryId);
    if (!cat) throw new NotFoundException('Category not found');

    const tags = await this.repo.findTagsByIds(payload.tagIds || []);

    const e = new PostEntity();
    e.title = payload.title;
    e.slug = slug;
    e.content = payload.content;
    e.category = cat;
    e.tags = tags;

    return this.repo.save(e);
  }
}
