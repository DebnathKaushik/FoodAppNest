import { OrderDetails } from "src/Order/Entities/orderDetails.entity";
import { Restaurant } from "src/Restaurants/Entities/Restaurant.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('Product')
export class Product{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    product_name:string;
    @Column('decimal',{precision:6,scale:2})
    price:number;
    @Column({nullable:true})
    description:string;
    
    @ManyToOne(()=>Restaurant, restaurant => restaurant.products,{ onDelete: 'CASCADE' })
    restaurant:Restaurant

    @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
    orderDetails: OrderDetails[];
}