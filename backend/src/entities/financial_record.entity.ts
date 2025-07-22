import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Booking } from './booking.entity';

export enum FinancialRecordType {
  EARNING = 'earning',
  WITHDRAWAL = 'withdrawal',
}

@Entity('financial_records')
export class FinancialRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'professional_id' })
  professional: User;

  @ManyToOne(() => Booking, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column({ type: 'enum', enum: FinancialRecordType })
  type: FinancialRecordType;

  @Column('decimal')
  amount: number;

  @Column({ nullable: true })
  status: string;

  @Column('uuid')
  professional_id: string;

  @CreateDateColumn()
  created_at: Date;
}