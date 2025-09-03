import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from '../impl/update-post.command';
import { PostRepositoryImpl } from '@/modules/posts/infrastructure/database/repositories/post.repository.impl';
import { slugify } from '@/common/utils/slugify.util';
import { PostEntity } from '@/modules/posts/infrastructure/database/entities/post.entity';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler
  implements ICommandHandler<UpdatePostCommand, PostEntity>
{
  constructor(private readonly repo: PostRepositoryImpl) {}

  async execute({ id, payload }: UpdatePostCommand): Promise<PostEntity> {
    const e = await this.repo.findOneById(id, true);
    if (!e) throw new NotFoundException('Post not found');

    // Title/Content
    if (typeof payload.title !== 'undefined') e.title = payload.title;
    if (typeof payload.content !== 'undefined') e.content = payload.content;

    // Slug: jika dikirim kosong -> slugify(title), jika dikirim non-blank -> pakai itu, jika tidak dikirim -> biarkan
    if (typeof payload.slug !== 'undefined') {
      const nextSlug = payload.slug?.trim?.() || slugify(e.title);
      if (!nextSlug) throw new BadRequestException('Invalid slug');
      // Cek duplikasi jika slug berubah
      if (nextSlug !== e.slug && (await this.repo.isSlugExists(nextSlug))) {
        throw new BadRequestException('Post slug already used');
      }
      e.slug = nextSlug;
    }

    // Category
    if (typeof payload.categoryId !== 'undefined') {
      const cat = await this.repo.findCategoryById(payload.categoryId);
      if (!cat) throw new NotFoundException('Category not found');
      e.category = cat;
    }

    // Tags
    if (typeof payload.tagIds !== 'undefined') {
      e.tags = await this.repo.findTagsByIds(payload.tagIds || []);
    }

    return this.repo.update(e);
  }
}
