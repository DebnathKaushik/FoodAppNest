import { Body, Controller, Get, Param, Post, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './DTOs/orderDTOs';
import { JwtAuthGuard } from 'src/Auth/Customer.Auth/jwt.guard';

@Controller('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @Post("create")
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  createOrder(@Request() req, @Body() dto: CreateOrderDto) {
    const customerId = req.user.id; // from JWT
    return this.orderService.createOrder(customerId, dto);
  }

//   @UseGuards(JwtAuthGuard)
//   @Get()
//   getMyOrders(@Request() req) {
//     const customerId = req.user.id;
//     return this.orderService.getOrdersByCustomer(customerId);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get(':id')
//   getOrderById(@Param('id') id: number) {
//     return this.orderService.getOrderById(id);
//   }
}
