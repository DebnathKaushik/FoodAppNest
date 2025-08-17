import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';

export class ProductDto {
  @IsString()
  product_name: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  restaurantId: number; 
}
