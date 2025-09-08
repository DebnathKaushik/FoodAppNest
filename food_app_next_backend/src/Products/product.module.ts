import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./Entities/Product.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Product]),],
    controllers:[],
    providers:[]
})

export class ProductModule{}