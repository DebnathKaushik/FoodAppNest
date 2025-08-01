import { Injectable } from "@nestjs/common";
import { CustomerDTO } from "./DTO/customerDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./Entity/Customer.entity";
import { Repository } from "typeorm";
import { ConflictException } from '@nestjs/common';

@Injectable()
export class CustomerService{
//declares a private variable (CustomerRepository) that holds this repository of (Customer) Type.
constructor(@InjectRepository(Customer) private CustomerRepository:Repository<Customer>){} 

//For just Check////////////////////////////////////
func1():string{
    return "Hello Customer Profile";
}

// Create Customer///////////////////////////////
async CreateCustomer(dto_data:CustomerDTO):Promise<Customer>{
//check this Customer exists or not in db.
const exists_customer = await this.CustomerRepository.findOne({
    where:[
        {name:dto_data.name},
        {email:dto_data.email}
    ]
})   
if(exists_customer){
    console.log("Customer name or Email are taken");
    throw new ConflictException("Customer Name or Email are taken")
}else{
    const customer = new Customer();
    customer.name = dto_data.name;
    customer.email = dto_data.email;
    customer.password = dto_data.password;
    customer.phone = dto_data.phone;
    console.log(customer);
    return this.CustomerRepository.save(customer);  // create a customer or save in db.
    }
}




}   