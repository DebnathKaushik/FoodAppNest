import { Controller,Body, Get, UsePipes, ValidationPipe, Post, Patch,Request, Param, ParseIntPipe, Delete, UseGuards } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerDTO } from "./DTOs/customerDTO";
import { JwtAuthGuard as CustomerJwtAuthGuard} from 'src/Auth/Customer.Auth/jwt.guard';

@Controller("Customer")
export class CustomerController{
    constructor(private readonly customerService:CustomerService){}

    // create Customer 
    @Post("sign-up")
    @UsePipes( new ValidationPipe())
    CreateCustomer(@Body() dto_data:CustomerDTO){
        return this.customerService.CreateCustomer(dto_data)
    }

    // Update Customer
    @Patch('update/:id')
    @UseGuards(CustomerJwtAuthGuard)
    update_Customer(@Param('id', ParseIntPipe) id: number,@Body() dto_data: CustomerDTO,@Request() req: any) {
    const customerId = req.user.id; // from JWT
        return this.customerService.update_Customer(id, dto_data, customerId);
    }

    // Delete Customer
    @Delete('delete/:id')
    @UseGuards(CustomerJwtAuthGuard)
    delete_Customer(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const customerId = req.user.id; // from JWT
        return this.customerService.delete_Customer(id, customerId);
    }

    

}
