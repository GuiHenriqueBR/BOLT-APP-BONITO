import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private readonly bookingRepo: Repository<Booking>,
  ) {}

  async findAll(params?: any) {
    return this.bookingRepo.find({ relations: ['proposal', 'client', 'professional'] });
  }

  async findOne(id: string) {
    const booking = await this.bookingRepo.findOne({ where: { id }, relations: ['proposal', 'client', 'professional'] });
    if (!booking) throw new NotFoundException('Agendamento não encontrado');
    return booking;
  }

  async create(data: any) {
    const booking = this.bookingRepo.create(data);
    await this.bookingRepo.save(booking);
    return booking;
  }

  async update(id: string, data: any) {
    const booking = await this.findOne(id);
    Object.assign(booking, data);
    await this.bookingRepo.save(booking);
    return booking;
  }

  async remove(id: string) {
    const booking = await this.findOne(id);
    await this.bookingRepo.remove(booking);
    return { message: 'Agendamento removido' };
  }
}