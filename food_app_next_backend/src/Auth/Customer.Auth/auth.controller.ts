import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { JwtAuthGuard as CustomerJwtAuthGuard} from 'src/Auth/Customer.Auth/jwt.guard';

@Controller('Customer/auth')
export class AuthController{
    constructor( private readonly authservice:AuthService){}

    // Customer Login
    @Post('login')
    async Customer_login(@Body() body:{email:string,password:string}, @Res({ passthrough: true }) res: Response){
        // wait here to create jwt in auth.service and then destructure token & user
        const{token,user} =  await this.authservice.Customer_login(body.email,body.password)
        // token store in cookie
        res.cookie("jwt_Customer",token,{
            httpOnly:true,
            sameSite:"lax",
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        });

        return {message:"Login Succesfull",user}
    }

    // Customer Dashboard 
  
    @Get('me')
    @UseGuards(CustomerJwtAuthGuard)
    getMe(@Req() req) {
        // `req.user` is set by JwtAuthGuard from JWT token
        const { id, email , name} = req.user;
        return { id, email, name }; // send this to frontend
    }

    // Customer Logout
    @Post("logout")
    logout(@Res({ passthrough: true }) res: Response) {
         // clears JWT cookie
        res.clearCookie("jwt_Customer",{
            httpOnly: true,
            sameSite: "lax",
            secure: false,
    });
        return { message: "Customer logged out successfully" };
    }

}