import { Controller,Body, Get, UsePipes, ValidationPipe, Post, Patch, Param, ParseIntPipe, Delete } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerDTO } from "./DTOs/customerDTO";

@Controller("Customer")
export class CustomerController{
    constructor(private readonly customerService:CustomerService){}

    // create Customer 
    @Post("sign-up")
    @UsePipes( new ValidationPipe())
    CreateCustomer(@Body() dto_data:CustomerDTO){
        return this.customerService.CreateCustomer(dto_data)
    }

    // update customer
    @Patch('update/:id')
    update_Customer(@Param('id',ParseIntPipe) id:number,
                        @Body() dto_data:CustomerDTO):any{

        return this.customerService.update_Customer(id,dto_data)
    }

    // update customer
    @Delete('delete/:id')
    delete_Customer(@Param('id',ParseIntPipe) id:number){
        return this.customerService.delete_Customer(id)
    }
    

}
