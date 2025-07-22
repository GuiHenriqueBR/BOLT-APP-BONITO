import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinancialRecord } from '../entities/financial_record.entity';
import { FinancialRecordType } from '../entities/financial_record.entity';

@Injectable()
export class FinancialsService {
  constructor(
    @InjectRepository(FinancialRecord) private readonly recordRepo: Repository<FinancialRecord>,
  ) {}

  async getBalance(professionalId: string) {
    const finalized = await this.recordRepo.find({ where: { professional_id: professionalId, type: FinancialRecordType.EARNING, status: 'finalized' } });
    const pending = await this.recordRepo.find({ where: { professional_id: professionalId, type: FinancialRecordType.EARNING, status: 'pending' } });
    const available = finalized.reduce((acc, r) => acc + Number(r.amount), 0);
    const pendingSum = pending.reduce((acc, r) => acc + Number(r.amount), 0);
    return { available, pending: pendingSum };
  }

  async getRecords(professionalId: string) {
    return this.recordRepo.find({ where: { professional_id: professionalId } });
  }

  async withdraw(professionalId: string, amount: number, bankAccountId: string) {
    const record = this.recordRepo.create({ professional_id: professionalId, type: FinancialRecordType.WITHDRAWAL, amount, status: 'pending' });
    await this.recordRepo.save(record);
    return record;
  }
}