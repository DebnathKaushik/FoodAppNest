import {IsString,IsEmail, IsNumber, Contains, ValidatorOptions, Matches} from 'class-validator'
import { CustomerName } from './Custom Validator/Name.Validator';
import { IsPassword } from './Custom Validator/password.Validator';

export class StudetDTO{
    @CustomerName() // Custom Validator
    name : string;

    @Matches(/^01\d{9}$/,{message: 'Phone number must start with 01 and contain only 11 digits'}) 
    @IsString()
    Phone : string;

    @IsPassword() // Custom validator
    password : string;
}