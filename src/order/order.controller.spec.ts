import { Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PaymentContext } from '../payment/payment.context';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: PaymentContext,
          useValue: {
            makePayment: jest.fn().mockResolvedValue('paymentResult'),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<OrderController>(OrderController);
    service = moduleRef.get<OrderService>(OrderService);
  });

  describe('checkout', () => {
    it('should call orderService.checkout with correct arguments', async () => {
      const paymentMethod = 'credit_card';
      const amount = 100;

      jest.spyOn(service, 'checkout').mockResolvedValue('checkoutResult');

      const result = await controller.checkout({ paymentMethod, amount });

      expect(service.checkout).toBeCalledWith(paymentMethod, amount);
      expect(result).toEqual('checkoutResult');
    });
  });
});
