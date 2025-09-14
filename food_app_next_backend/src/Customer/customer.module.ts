import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./Entities/Customer.entity";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CustomerAuthModule } from "src/Auth/Customer.Auth/auth.module";
import { JwtAuthGuard } from "src/Auth/Customer.Auth/jwt.guard";


@Module({
    imports:[TypeOrmModule.forFeature([Customer]),CustomerAuthModule],
    controllers:[CustomerController],
    providers:[CustomerService,JwtAuthGuard],
})

export class CustomerModule{}