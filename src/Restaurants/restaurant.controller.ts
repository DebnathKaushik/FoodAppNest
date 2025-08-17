import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { RestaurantDto } from "./DTOs/restaurant.dto";
import { ProductDto } from "src/Products/DTOs/Product.dto";
import { JwtAuthGuard } from "src/Auth/Restaurant.Auth/jwt.guard";


@Controller("Restaurant")
export class RestaurantController{
    constructor(private readonly restaurantService: RestaurantService){}

    // Get All Restaurant
    @Get('all-restaurant')
    Get_all_Restaurant(){
        return this.restaurantService.Get_all_Restaurant()
    } 

    // Get Specific Restaurant
    @Get(':id')
    Get_secific_Restaurant(@Param('id',ParseIntPipe) id:number){
        return this.restaurantService.Get_secific_Restaurant(id)
    } 

    // Get Product of Specific Restaurant
    @Get('product/:id')
    Get_secific_Restaurant_Product(@Param('id',ParseIntPipe) id:number){
        return this.restaurantService.Get_secific_Restaurant_Product(id)
    } 

    // Restaurant Create or Sign-up
    @Post('sign-up')
    @UsePipes( new ValidationPipe())
    CreateRestaurant(@Body() dto_data:RestaurantDto):any{
        return this.restaurantService.CreateRestaurant(dto_data)
    }
   
    // Restaurant Update
    @Patch('update/:id')
    @UseGuards(JwtAuthGuard)
    update_Restaurant(@Param('id',ParseIntPipe) id:number,
                       @Body() dto_data:RestaurantDto):any{

        return this.restaurantService.update_Restaurant(id,dto_data)
    }

    // Restaurant Delete
    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)
    delete_restaurant(@Param('id',ParseIntPipe) id:number):any{
        return this.restaurantService.delete_restaurant(id)
    }
    

    // Product Create 
    @Post('create-product')
    @UsePipes( new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    CreateProduct(@Body() dto_data:ProductDto):any{
        return this.restaurantService.CreateProduct(dto_data)
    }

    // Update spcific Product 
    @Patch('product-update/:id')
    @UseGuards(JwtAuthGuard)
    update_Product(@Param('id',ParseIntPipe) id:number,@Body() dto_data:ProductDto){
        return this.restaurantService.update_Product(id,dto_data)
    }

    // Delete spcific Product 
    @Delete('product-delete/:id')
    @UseGuards(JwtAuthGuard)
    delete_Product(@Param('id',ParseIntPipe) id:number){
        return this.restaurantService.delete_Product(id)
    }
} 


