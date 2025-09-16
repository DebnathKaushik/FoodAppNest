import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./Entities/Customer.entity";
import { Repository } from "typeorm";
import { CustomerDTO } from "./DTOs/customerDTO";
import * as bcrypt from 'bcrypt' 
import { json } from "stream/consumers";

@Injectable()
export class CustomerService{
    constructor(@InjectRepository(Customer) private customerRepo:Repository<Customer>){}


    // Create/ Sign up customer ------------------------------------------
    async CreateCustomer(dto_data:CustomerDTO):Promise<Customer>{
        const salt =  await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(dto_data.password,salt)

    // check Customer exist or not  
    const exists_customer = await this.customerRepo.findOne({
            where:[
                {customer_name:dto_data.customer_name},
                {email:dto_data.email}
            ]
        })   
        if(exists_customer){
            console.log("restaurant name or Email are taken");
            throw new ConflictException("restaurant Name or Email are taken")
        }else{
        // create a Customer object then save into DB
            const restaurant = this.customerRepo.create({
            ...dto_data,
            password:hashedPassword,
            })
            return await this.customerRepo.save(restaurant)
        }
    }
    
    // Customer Update-------------------------------------
        async update_Customer(id:number,dto_data:CustomerDTO,customerId:Number):Promise<Customer>{

            //Ownership check
            if (id !== customerId) {
                throw new ForbiddenException('You are not allowed to update this customer');
            }

            // find customer exist or not 
            const customer = await this.customerRepo.findOne({
                where:{ id }
            })
            if(!customer){
               throw new NotFoundException(`Customer with ID ${id} not found`);
            }

            // create again hash otherwise it updated with plain dto password
            const salt =  await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(dto_data.password,salt)
            customer.password = hashedPassword
    
            const {password, ...otherfields} = dto_data
            // here do not pass dto password Which is plain string
            const updated_customer =  Object.assign(customer,otherfields) 
            return await this.customerRepo.save(updated_customer)
        }
    
        
    // Customer Delete-------------------------------------
        async delete_Customer(id:number,customerId:Number):Promise<any>{

            //Ownership check
             if (id !== customerId) {
                throw new ForbiddenException('You are not allowed to delete this customer');
            }

            //// find customer exist or not 
            const customer = await this.customerRepo.findOne({
                where:{id}
            })
        if(!customer){
            throw new NotFoundException(`Restaurant with ID ${id} not found`);
        }
            return await this.customerRepo.remove(customer);
        }
}