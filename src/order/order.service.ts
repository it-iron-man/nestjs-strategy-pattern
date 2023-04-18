/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PaymentContext } from '../payment/payment.context';
import { PaymentFactory } from 'src/payment/payment.factory';

@Injectable()
export class OrderService {
  private paymentContext: PaymentContext;

  constructor(private paymentFactory: PaymentFactory) {
    this.paymentContext = new PaymentContext(null);
  }

  async checkout(paymentMethod: string, amount: number): Promise<string> {
    const paymentStrategy = this.paymentFactory.createStrategy(paymentMethod);
    this.paymentContext.setPaymentStrategy(paymentStrategy);
    const result = await this.paymentContext.initPayment(amount, 1, 1);
    return result;
  }
}
