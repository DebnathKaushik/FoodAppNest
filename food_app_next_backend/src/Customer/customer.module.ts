import { Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./Entities/Customer.entity";


@Module({
    // Here import is Entity Class ---> like Customer Entity
    imports:[TypeOrmModule.forFeature([Customer]),],
    controllers:[CustomerController],
    providers:[CustomerService]
})

export class CustomerModule{}

