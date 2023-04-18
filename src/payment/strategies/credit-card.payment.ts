import { PaymentStrategy } from './payment.strategy';

export class CreditCardPayment implements PaymentStrategy {
  private TerminalKey: string;
  private fakeResponse?: any;

  constructor(TerminalKey: string) {
    this.TerminalKey = TerminalKey;
  }

  async init(
    amount: number,
    orderId: number,
    customerKey: number,
  ): Promise<string> {
    const requestData = {
      TerminalKey: this.TerminalKey,
      Amount: amount,
      OrderId: orderId,
      CustomerKey: customerKey,
    };

    const fakeResponseData = this.fakeResponse || {
      Success: true,
      PaymentURL: 'https://example.com/payment',
    };

    const responseData = {
      ...fakeResponseData,
      RequestData: requestData || {},
    };

    if (!responseData.Success) {
      throw new Error('Payment initiation failed');
    }

    return responseData.PaymentURL;
  }

  setResponse(responseData: any, requestData?: any) {
    this.fakeResponse = {
      ...responseData,
      RequestData: requestData || {},
    };
  }
}
