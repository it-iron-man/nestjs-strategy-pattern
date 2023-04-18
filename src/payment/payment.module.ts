/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaymentContext } from './payment.context';
import { PaymentFactory } from './payment.factory';

@Module({
  providers: [PaymentContext, PaymentFactory],
  exports: [PaymentContext, PaymentFactory],
})
export class PaymentModule { }
