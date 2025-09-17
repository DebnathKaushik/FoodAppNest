import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order, OrderStatus } from './Entities/order.entity';
import { OrderDetails } from './Entities/orderDetails.entity';
import { Product } from 'src/Products/Entities/Product.entity';
import { CreateOrderDto } from './DTOs/orderDTOs';
import { Customer } from 'src/Customer/Entities/Customer.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetails) private orderDetailsRepo: Repository<OrderDetails>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}


  // Customer Order Create
  async createOrder(customerId: number, dto: CreateOrderDto) {
    const customer = await this.customerRepo.findOne({ where: { id: customerId } });
    if (!customer) throw new NotFoundException('Customer not found');

    if (!dto.products || dto.products.length === 0) {
      throw new BadRequestException('No products provided');
    }

    // Fetch products
    const productIds = dto.products.map(p => p.productId); // return array of product id (productId in DTO-> frontend)
    const products = await this.productRepo.find({
        where: { id: In(productIds) },
        relations:['restaurant']
    });

    if (products.length !== dto.products.length) {
      throw new NotFoundException('Some products not found');
    }

     //Ensure all products belong to the same restaurant
    const restaurantId = products[0].restaurant.id;
    const allSameRestaurant = products.every(p => p.restaurant.id === restaurantId);
    if (!allSameRestaurant) {
      throw new BadRequestException('All products in an order must belong to the same restaurant');
    }

    // Create order
    const order = this.orderRepo.create({
      customer,
      restaurant:products[0].restaurant,
      status: OrderStatus.PENDING,
      totalPrice: 0,
    });

    await this.orderRepo.save(order);

    // Create order details
    let totalPrice = 0;
    for (const p of dto.products) {
      const product = products.find(pr => pr.id === p.productId);
       if (!product) {
            throw new NotFoundException(`Product with ID ${p.productId} not found`);
        }
      const subtotal = Number(product.price) * p.quantity;
      totalPrice += subtotal;

      const orderDetail = this.orderDetailsRepo.create({
        order,
        product,
        quantity: p.quantity,
        price: subtotal,
      });

      await this.orderDetailsRepo.save(orderDetail);
    }

    // Update total price
    order.totalPrice = totalPrice;
    await this.orderRepo.save(order);

    // Fetch saved order with relations for response
   const savedOrder = await this.orderRepo.findOne({
        where: { id: order.id },
        relations: ['orderDetails', 'orderDetails.product', 'customer'],
    });

    if (!savedOrder) {
        throw new NotFoundException('Order not found after saving');
    }
    if (!savedOrder.customer) {
        throw new NotFoundException('Customer not found for this order');
    }

    const { password, ...customerWithoutPassword } = savedOrder.customer;

    return {
        id: savedOrder.id,
        status: savedOrder.status,
        totalPrice: savedOrder.totalPrice,
        createdAt: savedOrder.createdAt,
        customer: customerWithoutPassword,
        restaurant: savedOrder.restaurant
        ? {
            id: savedOrder.restaurant.id,
            restaurant_name: savedOrder.restaurant.restaurant_name,
            email: savedOrder.restaurant.email,
            phone: savedOrder.restaurant.phone,
            address: savedOrder.restaurant.address,
        }
        : null,
        orderDetails: savedOrder.orderDetails.map(od => ({
            id: od.id,
            quantity: od.quantity,
            price: od.price,
            product: {
                id: od.product.id,
                product_name: od.product.product_name,
                price: od.product.price,
                description: od.product.description,
            },
        })),
    };


}



// Restaurant can update status--------------------------------

async updateStatus(order_id:number,status:OrderStatus,restaurant_id:number):Promise<any>{
  const exist_order = await this.orderRepo.findOne({
    where:{id:order_id},
    relations:['restaurant'],
  })
  if(!exist_order){
    throw new NotFoundException('Order not found');
  }
  if(exist_order.restaurant.id !== restaurant_id){
    throw new ForbiddenException('You are not allowed to update this order');
  }

  exist_order.status = status;
  await this.orderRepo.save(exist_order)
  return {
    message: `Order status updated to ${status}`,
    order_id: exist_order.id,
    status: exist_order.status,
  };

}




// Get all orders of logged-in customer -----------------------
async getOrdersByCustomer(customerId: number) {

  const orders = await this.orderRepo.find({
    where: { customer: { id: customerId } },
    relations: ['orderDetails', 'orderDetails.product', 'restaurant'],
    order: { createdAt: 'DESC' },
  });

  return orders.map(order => {
    const { password, ...customer } = order.customer;
    return {
      id: order.id,
      status: order.status,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      customer,
      restaurant: order.restaurant
        ? {
            id: order.restaurant.id,
            restaurant_name: order.restaurant.restaurant_name,
            email: order.restaurant.email,
            phone: order.restaurant.phone,
            address: order.restaurant.address,
          }
        : null,
      orderDetails: order.orderDetails.map(od => ({
        id: od.id,
        quantity: od.quantity,
        price: od.price,
        product: {
          id: od.product.id,
          product_name: od.product.product_name,
          price: od.product.price,
          description: od.product.description,
        },
      })),
    };
  });
}

// Get all orders That Specific Restaurent--------------------------
async getOrdersByRestaurant(restaurantId: number) {
  return this.orderRepo.find({
    where: { restaurant: { id: restaurantId } },
    relations: ['orderDetails', 'orderDetails.product', 'customer'],
    order: { createdAt: 'DESC' },
  });
}





}
