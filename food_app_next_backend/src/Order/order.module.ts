import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./Entities/order.entity";
import { OrderDetails } from "./Entities/orderDetails.entity";
import { Product } from "src/Products/Entities/Product.entity";
import { Customer } from "src/Customer/Entities/Customer.entity";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { CustomerAuthModule } from "src/Auth/Customer.Auth/auth.module";
import { JwtAuthGuard } from "src/Auth/Customer.Auth/jwt.guard";
import { RestaurantAuthModule } from "src/Auth/Restaurant.Auth/auth.module";

@Module({
    imports:[TypeOrmModule.forFeature([Order,OrderDetails,Product,Customer]),CustomerAuthModule,RestaurantAuthModule],
    controllers:[OrderController],
    providers:[OrderService,JwtAuthGuard],
})

export class OrderModule{}

