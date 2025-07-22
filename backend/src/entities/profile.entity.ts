import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

export enum KycStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  bio: string;

  @Column({ type: 'float', default: 0 })
  rating_avg: number;

  @Column({ type: 'enum', enum: KycStatus, default: KycStatus.PENDING })
  kyc_status: KycStatus;

  @Column({ type: 'jsonb', nullable: true })
  documents_metadata: any;
}