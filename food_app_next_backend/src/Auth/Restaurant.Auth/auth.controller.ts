import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { JwtAuthGuard } from "src/Auth/Restaurant.Auth/jwt.guard";

@Controller('Restaurant/auth')
export class AuthController{

    constructor( private readonly authservice:AuthService){}

// Restaurant Login
    @Post('login')
    async Restaurant_login(@Body() body:{email:string,password:string},@Res({ passthrough: true }) res: Response){
         // wait here to create jwt in auth.service and then destructure token & user
        const{token,user} = await this.authservice.Restaurant_login(body.email,body.password)
         res.cookie("jwt_restaurant",token,{
            httpOnly:true,
            sameSite:"lax",
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        });

        return {message:"Login Succesfull",user}
    }

    // Restaurant Dashboard 
    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@Req() req) {
    // `req.user` is set by JwtAuthGuard from JWT token
    const { id, email, name, address, city, phone } = req.user;
        return { id, email, name, address, city, phone };// send this to frontend
     }
    

    // restaurant logout
    @Post("logout")
    logout(@Res({ passthrough: true }) res: Response) {
         // clears JWT cookie
        res.clearCookie("jwt_restaurant",{
            httpOnly: true,
            sameSite: "lax",
            secure: false,
    });
        return { message: "Restaurant logged out successfully" };
    }


}