import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";

@Entity("Customer")
export class Customer{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    phone:string
}