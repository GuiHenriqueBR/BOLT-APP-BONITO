import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { OpenRequest } from './open_request.entity';
import { User } from './user.entity';

export enum ProposalStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Entity('proposals')
export class Proposal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OpenRequest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'request_id' })
  request: OpenRequest;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'professional_id' })
  professional: User;

  @Column('decimal')
  amount: number;

  @Column({ nullable: true })
  message: string;

  @Column('int')
  deadline_days: number;

  @Column({ type: 'enum', enum: ProposalStatus, default: ProposalStatus.PENDING })
  status: ProposalStatus;

  @CreateDateColumn()
  created_at: Date;
}