import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('Restaurant/auth')
export class AuthController{

    constructor( private readonly authservice:AuthService){}

// Restaurant Login
    @Post('login')
    async Restaurant_login(@Body() body:{email:string,password:string}){
        return this.authservice.Restaurant_login(body.email,body.password)
    }


}