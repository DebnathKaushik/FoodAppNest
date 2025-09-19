import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { JwtAuthGuard as CustomerJwtAuthGuard} from 'src/Auth/Customer.Auth/jwt.guard';
import { PusherService } from "src/pusher/pusher.service";

@Controller('Customer/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly pusherService: PusherService
  ) {}

    // Customer Login
    @Post('login')
    async Customer_login(
        @Body() body: { email: string; password: string },
        @Res({ passthrough: true }) res: Response
    ) {
        // login logic
        const { token, user } = await this.authService.Customer_login(body.email,body.password);

        // store token in cookie
        res.cookie("jwt_Customer", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

         // Trigger Pusher event
        await this.pusherService.trigger('notification', 'user-logged-in', {
          message: `${user.customer_name} just logged in!`,
        });


        return { message: "Login Successful", user };
    }


    // Customer Dashboard 
    @Get('me')
    @UseGuards(CustomerJwtAuthGuard)
    async getMe(@Req() req) {
    const { id, email, customer_name, phone, address } = req.user;
    return { id, email, customer_name, phone, address }; // keys must match frontend
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