import { Customer } from "src/Customer/Entities/Customer.entity";
import { Restaurant } from "src/Restaurants/Entities/Restaurant.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

@Entity("Order")
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  // Customer relation
  @ManyToOne(()=> Customer, (customer)=>customer.orders,{eager:true,onDelete:'CASCADE'})
  customer:Customer

  // Resturent relation
  @ManyToOne(()=>Restaurant, (restaurant) => restaurant.orders, {eager:true,onDelete:"CASCADE"})
  restaurant:Restaurant

  // OrderDetails relation
  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order, { cascade: true })
  orderDetails: OrderDetails[];
}
