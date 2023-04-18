import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PaymentContext } from '../payment/payment.context';
import { CreditCardPayment } from '../payment/strategies/credit-card.payment';
import { WalletPayment } from '../payment/strategies/wallet.payment';

describe('OrderService', () => {
  let service: OrderService;
  let paymentContext: PaymentContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        PaymentContext,
        CreditCardPayment,
        WalletPayment,
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    paymentContext = module.get<PaymentContext>(PaymentContext);
  });

  it('should return success message for credit card payment', async () => {
    const result = 'Credit card payment for $50 processed successfully';
    jest
      .spyOn(paymentContext, 'initPayment')
      .mockImplementation(async () => result);

    const response = await service.checkout('credit_card', 50);

    expect(response).toBe(result);
  });

  it('should return success message for wallet payment', async () => {
    const result = 'Wallet payment for $50 processed successfully';
    jest
      .spyOn(paymentContext, 'initPayment')
      .mockImplementation(async () => result);

    const response = await service.checkout('wallet', 50);

    expect(response).toBe(result);
  });

  it('should throw error for unsupported payment method', async () => {
    const unsupportedMethod = 'unsupported_method';
    jest.spyOn(paymentContext, 'initPayment').mockImplementation(async () => {
      throw new Error('Unsupported payment method');
    });

    await expect(service.checkout(unsupportedMethod, 50)).rejects.toThrowError(
      'Unsupported payment method',
    );
  });
});
