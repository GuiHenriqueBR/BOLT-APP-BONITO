import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpenRequest } from '../entities/open_request.entity';
import { Proposal } from '../entities/proposal.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(OpenRequest) private readonly requestRepo: Repository<OpenRequest>,
    @InjectRepository(Proposal) private readonly proposalRepo: Repository<Proposal>,
  ) {}

  async findAll(params?: any) {
    return this.requestRepo.find({ relations: ['client', 'category', 'subcategory'] });
  }

  async findOne(id: string) {
    const req = await this.requestRepo.findOne({ where: { id }, relations: ['client', 'category', 'subcategory'] });
    if (!req) throw new NotFoundException('Pedido não encontrado');
    return req;
  }

  async create(data: any) {
    const req = this.requestRepo.create(data);
    await this.requestRepo.save(req);
    return req;
  }

  async update(id: string, data: any) {
    const req = await this.findOne(id);
    Object.assign(req, data);
    await this.requestRepo.save(req);
    return req;
  }

  async remove(id: string) {
    const req = await this.findOne(id);
    await this.requestRepo.remove(req);
    return { message: 'Pedido removido' };
  }

  // Proposals
  async createProposal(requestId: string, professionalId: string, data: any) {
    const proposal = this.proposalRepo.create({ ...data, request: { id: requestId }, professional: { id: professionalId } });
    await this.proposalRepo.save(proposal);
    return proposal;
  }
}