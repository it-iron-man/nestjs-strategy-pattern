import { PaymentStrategy } from './strategies/payment.strategy';

export class PaymentContext {
  paymentStrategy: PaymentStrategy;

  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  setPaymentStrategy(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  async initPayment(
    amount: number,
    orderId: number,
    customerId: number,
  ): Promise<string> {
    return this.paymentStrategy.init(amount, orderId, customerId);
  }
}
