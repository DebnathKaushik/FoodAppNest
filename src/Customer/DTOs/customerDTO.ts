import { IsString,Matches } from "class-validator";
import { ISEmail } from "../Custom Validator/email.validator";
import { CustomerName } from "../Custom Validator/name.validator";
import { IsPassword} from "../Custom Validator/password.validator";


export class CustomerDTO{

    //Custom validator
    @CustomerName()  
    name:string;

    // Custom validator
    @ISEmail()      
    email:string
   
    //Custom validator
    @IsPassword() 
    password:string;

    // Built in Vallidator
    @Matches(/^01\d{9}$/,{message: 'phone number must have 01 first and 11 digits'}) 
    @IsString()
    phone:string;

} 