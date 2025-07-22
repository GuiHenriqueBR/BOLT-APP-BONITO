import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Subcategory } from './subcategory.entity';

export enum ServiceType {
  PRESENTIAL = 'presential',
  REMOTE = 'remote',
}

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'professional_id' })
  professional: User;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Subcategory)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: Subcategory;

  @Column({ type: 'enum', enum: ServiceType })
  type: ServiceType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}