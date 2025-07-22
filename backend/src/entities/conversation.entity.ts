import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { array: true })
  participants: string[];

  @Column({ type: 'timestamp', nullable: true })
  last_message_timestamp: Date;
}