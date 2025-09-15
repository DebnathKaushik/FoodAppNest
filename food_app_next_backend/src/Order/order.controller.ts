import { Body, Controller, Get, Param, Post, UseGuards, Request, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './DTOs/orderDTOs';
import { JwtAuthGuard as CustomerJwtAuthGuard} from 'src/Auth/Customer.Auth/jwt.guard';
import { OrderStatus } from './Entities/order.entity';
import { JwtAuthGuard as RestaurantJwtAuthGuard} from 'src/Auth/Restaurant.Auth/jwt.guard';

@Controller('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Customer Create Order
  @Post("create")
  @UsePipes(new ValidationPipe())
  @UseGuards(CustomerJwtAuthGuard)
  createOrder(@Request() req, @Body() dto: CreateOrderDto) {
    const customerId = req.user.id; // from JWT
    return this.orderService.createOrder(customerId, dto);
  }

  // Restaurant update status 
  @Patch(':id/status')
  @UseGuards(RestaurantJwtAuthGuard)
  updateStatus(@Param('id') order_id:number ,@Body('status') status:OrderStatus,@Request() req){
    const restaurant_id = req.user.id; // restaurant (id) from JWT , this is not param -> id 
    return this.orderService.updateStatus(order_id,status,restaurant_id);
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
