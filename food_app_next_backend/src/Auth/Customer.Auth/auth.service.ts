import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv';
import { Customer } from "src/Customer/Entities/Customer.entity";
dotenv.config();


@Injectable()
export class AuthService{
    constructor(
    @InjectRepository(Customer) private CustomerRepo:Repository<Customer>,
    private jwtservice: JwtService,
){}

// Restaurant Login
    async Customer_login(email:string,password:string){
        const exist_customer = await this.CustomerRepo.findOne({
            where:{email}
        })
        if(!exist_customer){
             throw new UnauthorizedException('Invalid credentials');
        }
        const pass_check = await bcrypt.compare(password,exist_customer.password)
        if(!pass_check){
             throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {id:exist_customer.id, email:exist_customer.email, name:exist_customer.customer_name};
        const token =  this.jwtservice.sign(payload)
        return {token,user:{id:exist_customer.id, email:exist_customer.email, name:exist_customer.customer_name}}
    }

    async verify_token(token: string) {
        return this.jwtservice.verify(token, { secret: process.env.MY_SECRET2});
    }


}