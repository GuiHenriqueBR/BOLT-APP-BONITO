import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createPayment(@Body() body: { amount: number }) {
    return this.paymentsService.createPaymentIntent(body.amount);
  }

  @Get('methods')
  async getPaymentMethods(@Req() req: Request) {
    return this.paymentsService.getPaymentMethods((req.user as any).userId);
  }

  @Post('methods')
  async addPaymentMethod(@Req() req: Request, @Body() body: { paymentMethodId: string }) {
    return this.paymentsService.addPaymentMethod((req.user as any).userId, body.paymentMethodId);
  }
}