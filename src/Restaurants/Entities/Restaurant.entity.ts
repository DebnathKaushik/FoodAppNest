import { Product } from "src/Products/Entities/Product.entity";
import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";

export enum RestaurantStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}


@Entity('Restaurant')
export class Restaurant{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    restaurant_name:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    phone:string
    @Column()
    address:string;
    @Column()
    city:string
    @OneToMany(()=>Product, product => product.restaurant,{cascade:true})
    products:Product[]

}