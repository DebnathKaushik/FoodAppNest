import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "src/Restaurants/Entities/Restaurant.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class AuthService{
    constructor(
    @InjectRepository(Restaurant) private RestaurantRepo:Repository<Restaurant>,
    private jwtservice: JwtService,
){}

// Restaurant Login
    async Restaurant_login(email:string,password:string){
        const exist_seller = await this.RestaurantRepo.findOne({
            where:{email}
        })
        if(!exist_seller){
            if (!exist_seller) throw new UnauthorizedException('Invalid credentials');
        }
        const pass_check = await bcrypt.compare(password,exist_seller.password)
        if(!pass_check){
            if (!pass_check) throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {id:exist_seller.id, email:exist_seller.email}
        const token =  this.jwtservice.sign(payload)

        return {access_token:token}
    }

    async verify_token(token: string) {
        return this.jwtservice.verify(token, { secret: process.env.MY_SECRET});
    }


}