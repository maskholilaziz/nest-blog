import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '@/modules/posts/infrastructure/database/entities/post.entity';
import { slugify } from '@/common/utils/slugify.util';

@Index('UQ_tags_slug_active', ['slug'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
@Entity({ name: 'tags' })
export class TagEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'slug', type: 'varchar', length: 200 })
  slug: string;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @ManyToMany(() => PostEntity, (post) => post.tags)
  posts: PostEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  makeSlug() {
    this.name = this.name?.trim();
    this.slug = slugify(this.name);
  }
}
