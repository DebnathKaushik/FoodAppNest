import { IsString,Matches } from "class-validator";
import { ISEmail } from "../CustomValidator/email.validator";
import { CustomerName } from "../CustomValidator/name.validator";
import { IsPassword} from "../CustomValidator/password.validator";


export class CustomerDTO{

    @CustomerName()  //Custom validator
    name:string;

    @ISEmail()       // Custom validator
    email:string
   
    @IsPassword() //Custom validator
    password:string;

    @Matches(/^01\d{9}$/,{message: 'phone number must have 01 first and 11 digits'}) 
    @IsString()
    phone:string;

} 