import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('Customer/auth')
export class AuthController{
    constructor( private readonly authservice:AuthService){}

// Restaurant Login
    @Post('login')
    async Customer_login(@Body() body:{email:string,password:string}){
        return this.authservice.Customer_login(body.email,body.password)
    }


}