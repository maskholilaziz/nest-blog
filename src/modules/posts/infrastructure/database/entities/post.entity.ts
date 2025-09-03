import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '@/modules/categories/infrastructure/database/entities/category.entity';
import { TagEntity } from '@/modules/tags/infrastructure/database/entities/tag.entity';

@Index('UQ_posts_slug_active', ['slug'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  // (5) Panjang slug dibatasi
  @Column({ name: 'slug', type: 'varchar', length: 200 })
  slug: string;

  // (5) title varchar(500)
  @Column({ name: 'title', type: 'varchar', length: 500 })
  title: string;

  // (3) content type text
  @Column({ name: 'content', type: 'text' })
  content: string;

  // (4) nama kolom category_id (snake_case)
  @ManyToOne(() => CategoryEntity, (cat) => cat.posts, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  category: CategoryEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.posts, { cascade: false })
  @JoinTable({ name: 'post_tags' }) // nama pivot table
  tags: TagEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  // (6) soft delete
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date | null;
}
