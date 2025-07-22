import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { ServicePackage } from '../entities/service_package.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private readonly serviceRepo: Repository<Service>,
    @InjectRepository(ServicePackage) private readonly packageRepo: Repository<ServicePackage>,
  ) {}

  async findAll(params?: any) {
    return this.serviceRepo.find({ relations: ['professional', 'category', 'subcategory'] });
  }

  async findOne(id: string) {
    const service = await this.serviceRepo.findOne({ where: { id }, relations: ['professional', 'category', 'subcategory'] });
    if (!service) throw new NotFoundException('Serviço não encontrado');
    return service;
  }

  async create(data: any) {
    const service = this.serviceRepo.create(data);
    await this.serviceRepo.save(service);
    return service;
  }

  async update(id: string, data: any) {
    const service = await this.findOne(id);
    Object.assign(service, data);
    await this.serviceRepo.save(service);
    return service;
  }

  async remove(id: string) {
    const service = await this.findOne(id);
    await this.serviceRepo.remove(service);
    return { message: 'Serviço removido' };
  }
}