/* eslint-disable prettier/prettier */
export interface PaymentStrategy {
  init(amount: number, order: number, customer: number): Promise<string>;
}
