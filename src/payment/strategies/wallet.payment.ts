/* eslint-disable prettier/prettier */
import { PaymentStrategy } from './payment.strategy';

export class WalletPayment implements PaymentStrategy {
  private Shop_IDP: string;
  private MeanType: string;
  private EMoneyType: string;
  private Lifetime: number;

  constructor(Shop_IDP: string, MeanType: string, EMoneyType: string, Lifetime: number) {
    this.Shop_IDP = Shop_IDP;
    this.MeanType = MeanType;
    this.EMoneyType = EMoneyType;
    this.Lifetime = Lifetime;
  }

  async init(amount: number, orderId: number, Customer_IDP: number): Promise<string> {
    const queryParams = new URLSearchParams({
      Shop_IDP: this.Shop_IDP,
      MeanType: this.MeanType,
      EMoneyType: this.EMoneyType,
      Lifetime: this.Lifetime.toString(),
      Order_IDP: orderId.toString(),
      Subtotal_P: amount.toString(),
      Customer_IDP: Customer_IDP.toString()
    });

    const requestUrl = `https://wpay.uniteller.ru/pay/?${queryParams.toString()}`;

    return requestUrl;
  }


}
