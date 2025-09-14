import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

  // Order Create
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

//   async getOrdersByCustomer(customerId: number) {
//     return this.orderRepo.find({
//       where: { customer: { id: customerId } },
//       relations: ['orderDetails', 'orderDetails.product'],
//     });
//   }

//   async getOrderById(orderId: number) {
//     const order = await this.orderRepo.findOne({
//       where: { id: orderId },
//       relations: ['orderDetails', 'orderDetails.product'],
//     });
//     if (!order) throw new NotFoundException('Order not found');
//     return order;
//   }
}
