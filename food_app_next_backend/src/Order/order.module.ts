import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./Entities/order.entity";
import { OrderDetails } from "./Entities/orderDetails.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Order,OrderDetails])],
    controllers:[],
    providers:[],
})

export class OrderModule{}

