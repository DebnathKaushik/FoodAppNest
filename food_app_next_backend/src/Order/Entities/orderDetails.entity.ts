import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "src/Products/Entities/Product.entity";
import { Order } from "./order.entity";

@Entity("OrderDetails")
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column("decimal", { precision: 10, scale: 2 })
  price: number; 

  // Many order-details belong to one order
  @ManyToOne(() => Order, (order) => order.orderDetails, { onDelete: "CASCADE" })
  order: Order;

  // Many order-details belong to one product
  @ManyToOne(() => Product, (product) => product.orderDetails, { eager: true })
  product: Product;
}
