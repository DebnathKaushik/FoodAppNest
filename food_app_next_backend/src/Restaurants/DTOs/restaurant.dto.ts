import { IsString, IsEmail, MinLength } from 'class-validator';
import { ISEmail } from '../Custom Validator/restaurant_email.validator';
import { RestaurantName } from '../Custom Validator/restaurant_name.validator';

export class RestaurantDto {
    
  // Custom Validator
  @RestaurantName()
  restaurant_name: string;

  // Custom Validator
  @ISEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  city: string;
}
