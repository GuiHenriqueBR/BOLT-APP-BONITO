import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialRecord } from '../entities/financial_record.entity';
import { FinancialsService } from './financials.service';
import { FinancialsController } from './financials.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialRecord])],
  providers: [FinancialsService],
  controllers: [FinancialsController],
})
export class FinancialsModule {}