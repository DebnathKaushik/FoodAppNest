import { Type } from "class-transformer";
import { IsArray, IsInt, Min, ValidateNested } from "class-validator";

export class ProductOrder{
        @IsInt()
        productId: number;

        @IsInt()
        @Min(1)
        quantity: number;
    }

export class CreateOrderDto{
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductOrder)
    products: ProductOrder[];
}