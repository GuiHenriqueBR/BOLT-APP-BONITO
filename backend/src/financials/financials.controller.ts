import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { FinancialsService } from './financials.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('api/financials')
export class FinancialsController {
  constructor(private readonly financialsService: FinancialsService) {}

  @Get('balance')
  async getBalance(@Req() req: Request) {
    return this.financialsService.getBalance((req.user as any).userId);
  }

  @Get('records')
  async getRecords(@Req() req: Request) {
    return this.financialsService.getRecords((req.user as any).userId);
  }

  @Post('withdraw')
  async withdraw(@Req() req: Request, @Body() body: { amount: number; bankAccountId: string }) {
    return this.financialsService.withdraw((req.user as any).userId, body.amount, body.bankAccountId);
  }
}