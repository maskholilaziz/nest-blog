import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '@/modules/posts/infrastructure/database/entities/post.entity';
import { slugify } from '@/common/utils/slugify.util';

// Unique slug hanya untuk record yang belum soft-delete (PostgreSQL)
@Index('UQ_categories_slug_active', ['slug'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
@Entity({ name: 'categories' }) // => nama tabel 'categories'
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  // Panjang slug dibatasi agar aman (misal 200)
  @Column({ name: 'slug', type: 'varchar', length: 200 })
  slug: string;

  @Column({ name: 'name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;

  // Relasi 1:N -> satu kategori punya banyak post
  @OneToMany(() => PostEntity, (post) => post.category)
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
    // slug SELALU dari name, di-trim dan dinormalisasi
    this.name = this.name?.trim();
    this.slug = slugify(this.name);
  }
}
