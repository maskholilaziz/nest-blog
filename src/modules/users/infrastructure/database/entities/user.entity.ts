import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @Column({ name: 'id_number', type: 'varchar', unique: true })
  idNumber: string;

  @Column({ name: 'id_type', type: 'varchar' })
  idType: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'nickname', type: 'varchar', nullable: true })
  nickname: string;

  @Column({ name: 'preferred_username', type: 'varchar' })
  preferredUsername: string;

  @Column({ name: 'picture', type: 'text', nullable: true })
  picture: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({
    name: 'email_verified',
    type: 'varchar',
    nullable: true,
  })
  emailVerified: string;

  @Column({ name: 'gender', type: 'varchar', nullable: true })
  gender: string;

  @Column({ name: 'birthdate', type: 'timestamptz', nullable: true })
  birthdate: Date;

  @Column({ name: 'phone_number', type: 'varchar' })
  phoneNumber: string;

  @Column({
    name: 'phone_number_verified',
    type: 'varchar',
    nullable: true,
  })
  phoneNumberVerified: string;

  @Column({ name: 'address', type: 'text' })
  address: string;

  @Column({
    name: 'place_of_birth',
    type: 'varchar',
    nullable: true,
  })
  placeOfBirth: string;

  @Column({
    name: 'nationalities',
    type: 'varchar',
    nullable: true,
  })
  nationalities: string;

  @Column({ name: 'postal_code', type: 'varchar', nullable: true })
  postalCode: string;

  @Column({ name: 'city', type: 'varchar', nullable: true })
  city: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Column({ name: 'status', type: 'jsonb', nullable: true })
  status: Record<string, any>;
}