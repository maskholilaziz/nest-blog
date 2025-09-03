import { PostEntity } from '../entities/post.entity';

export interface PostRepository {
  findOneById(id: string, withRelations?: boolean): Promise<PostEntity | null>;
  findAll(withRelations?: boolean): Promise<PostEntity[]>;
  save(entity: PostEntity): Promise<PostEntity>;
  update(entity: PostEntity): Promise<PostEntity>;
  remove(id: string): Promise<void>; // soft delete
  isSlugExists(slug: string): Promise<boolean>;
}
