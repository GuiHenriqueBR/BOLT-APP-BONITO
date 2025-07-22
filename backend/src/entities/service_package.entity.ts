import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity('service_packages')
export class ServicePackage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Service, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal')
  price: number;

  @Column('int')
  delivery_days: number;
}