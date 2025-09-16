import { Controller,Body, Get, UsePipes, ValidationPipe, Post, Patch,Request, Param, ParseIntPipe, Delete, UseGuards, Req, Res } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerDTO } from "./DTOs/customerDTO";
import { JwtAuthGuard as CustomerJwtAuthGuard} from 'src/Auth/Customer.Auth/jwt.guard';
import { AuthService } from "src/Auth/Customer.Auth/auth.service";

@Controller("Customer")
export class CustomerController{
    constructor(private readonly customerService:CustomerService,
        private readonly authservice:AuthService
    ){}
    

    // create Customer 
    @Post("sign-up")
    @UsePipes( new ValidationPipe())
    CreateCustomer(@Body() dto_data:CustomerDTO){
        return this.customerService.CreateCustomer(dto_data)
    }

    // Update Customer
    @Patch('update/:id')
    @UseGuards(CustomerJwtAuthGuard)
    async update_Customer(@Param('id', ParseIntPipe) id: number,@Body() dto_data: CustomerDTO,@Req() req: any,@Res({ passthrough: true }) res: any) {

    const customerId = req.user.id;

    const updatedCustomer = await this.customerService.update_Customer(id, dto_data, customerId);

    const jwt = await this.authservice.generateCustomerJwt(updatedCustomer);

    // Also set cookie
    res.cookie('jwt_Customer', jwt, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    });

    return {
        token: jwt, // return token explicitly
        customer: {
        id: updatedCustomer.id,
        customer_name: updatedCustomer.customer_name,
        email: updatedCustomer.email,
        phone: updatedCustomer.phone,
        address: updatedCustomer.address,
        },
    };
    }




    // Delete Customer
    @Delete('delete/:id')
    @UseGuards(CustomerJwtAuthGuard)
    delete_Customer(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const customerId = req.user.id; // from JWT
        return this.customerService.delete_Customer(id, customerId);
    }

    

}
