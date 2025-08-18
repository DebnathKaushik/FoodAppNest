import { Module } from "@nestjs/common";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "./Entities/Restaurant.entity";
import { Product } from "src/Products/Entities/Product.entity";
import { JwtAuthGuard } from "src/Auth/Restaurant.Auth/jwt.guard";
import { RestaurantAuthModule } from "src/Auth/Restaurant.Auth/auth.module";

@Module({
    imports:[TypeOrmModule.forFeature([Restaurant,Product]),RestaurantAuthModule],
    controllers:[RestaurantController],
    providers:[RestaurantService,JwtAuthGuard]
})

export class RestaurantModule{}