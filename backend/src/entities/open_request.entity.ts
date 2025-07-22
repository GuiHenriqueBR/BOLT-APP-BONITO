import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Subcategory } from './subcategory.entity';

export enum OpenRequestStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

@Entity('open_requests')
export class OpenRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Subcategory)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: Subcategory;

  @Column()
  type: string;

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'date', nullable: true })
  desired_date: Date;

  @Column('decimal')
  budget_min: number;

  @Column('decimal')
  budget_max: number;

  @Column({ type: 'enum', enum: OpenRequestStatus, default: OpenRequestStatus.OPEN })
  status: OpenRequestStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}