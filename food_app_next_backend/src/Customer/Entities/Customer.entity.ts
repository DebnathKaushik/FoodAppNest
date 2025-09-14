import { Order } from "src/Order/Entities/order.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("Customer")
export class Customer{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    customer_name:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    phone:string
    @Column()
    address:string

    @OneToMany(()=>Order, (order)=>order.customer,{cascade:true})
    orders:Order[];
}