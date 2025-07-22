import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

  async createPaymentIntent(amount: number, currency = 'brl') {
    return this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method_types: ['card'],
    });
  }

  async getPaymentMethods(customerId: string) {
    return this.stripe.paymentMethods.list({ customer: customerId, type: 'card' });
  }

  async addPaymentMethod(customerId: string, paymentMethodId: string) {
    return this.stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
  }
}