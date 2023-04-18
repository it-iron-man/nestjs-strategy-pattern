/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async checkout(
    @Body() body: { paymentMethod: string; amount: number },
  ): Promise<string> {
    const { paymentMethod, amount } = body;
    const result = await this.orderService.checkout(paymentMethod, amount);
    return result;
  }
}
