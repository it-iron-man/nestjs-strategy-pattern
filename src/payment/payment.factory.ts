import { CreditCardPayment } from './strategies/credit-card.payment';
import { PaymentStrategy } from './strategies/payment.strategy';
import { WalletPayment } from './strategies/wallet.payment';

export class PaymentFactory {
  private paymentStrategies: Record<string, PaymentStrategy> = {
    credit_card: new CreditCardPayment('TerminalKeyNumber'),
    wallet: new WalletPayment('token', '0', '0', 3600),
  };

  createStrategy(paymentMethod: string): PaymentStrategy {
    if (!this.isSupported(paymentMethod)) {
      throw new Error('Unsupported payment method');
    }

    return this.paymentStrategies[paymentMethod];
  }

  isSupported(paymentMethod: string): boolean {
    return paymentMethod in this.paymentStrategies;
  }
}
