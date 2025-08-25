import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "./Entities/Restaurant.entity";
import { Repository } from "typeorm";
import { RestaurantDto } from "./DTOs/restaurant.dto";
import * as bcrypt from 'bcrypt' 
import { Product } from "src/Products/Entities/Product.entity";
import { ProductDto } from "src/Products/DTOs/Product.dto";


@Injectable()
export class RestaurantService{
    
   constructor(
    @InjectRepository(Restaurant) private  RestaurantRepo:Repository<Restaurant>,
    @InjectRepository(Product) private ProductRepo:Repository<Product>
){} 

// Get all restaurant-------------------------------------------
    Get_all_Restaurant():Promise<Restaurant[]>{
        return this.RestaurantRepo.find()
    }

// Get Specific restaurant(id)----------------------------------------
    async Get_secific_Restaurant(id: number): Promise<Restaurant> {
    const restaurant = await this.RestaurantRepo.findOne({
      where: { id },
    });

    if (!restaurant) {
       throw new HttpException('Restaurant id Not found', HttpStatus.NOT_FOUND);
    }

    return restaurant;
  }

// Get Product of Specific Restaurant----------------------------------------
    async Get_secific_Restaurant_Product(id: number): Promise<Restaurant> {
    const restaurant = await this.RestaurantRepo.findOne({
      where: { id },
      relations: ['products'], // products entity
    });

    if (!restaurant) {
       throw new ConflictException("Restaurant not found with this ID")
    }

    return restaurant;
  }


// Restuarant Sign-up / Create ----------------------------------------
    async CreateRestaurant(dto_data:RestaurantDto):Promise<Restaurant>{
        const salt =  await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(dto_data.password, salt);

        // check restaurant exist or not  
        const exists_restaurant = await this.RestaurantRepo.findOne({
              where:[
                  {restaurant_name:dto_data.restaurant_name},
                  {email:dto_data.email}
              ]
          })   
          if(exists_restaurant){
              console.log("restaurant name or Email are taken");
              throw new ConflictException("restaurant Name or Email are taken")
          }else{
            // create a object then save into DB
              const restaurant = this.RestaurantRepo.create({
                ...dto_data,
                password:hashedPassword,
              })
              return await this.RestaurantRepo.save(restaurant)
          }
    }

// Restaurant Update-------------------------------------
    async update_Restaurant(id:number,dto_data:RestaurantDto):Promise<Restaurant>{
        const restaurant = await this.RestaurantRepo.findOne({
            where:{ id }
        })
        if(!restaurant){
           throw new NotFoundException(`Restaurant with ID ${id} not found`);
        }
        // create again hash otherwise it updated with plain dto password
        const salt =  await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(dto_data.password,salt)
        restaurant.password = hashedPassword

        const {password, ...otherfields} = dto_data
        // here do not pass dto password Which is plain string
        const updated_restaurant =  Object.assign(restaurant,otherfields) 
        return await this.RestaurantRepo.save(updated_restaurant)
    }

// Restaurant Delete--------------------------------------
    async delete_restaurant(id:number):Promise<Restaurant>{
        const restaurant = await this.RestaurantRepo.findOne({
            where:{id}
        })
        if(!restaurant){
            throw new NotFoundException(`Restaurant with ID ${id} not found`);
        }
         
        return await this.RestaurantRepo.remove(restaurant);
    }



// Product Create----------------------------------------
    async CreateProduct(dto_data: ProductDto): Promise<Product> {
    //  Check if restaurant exists
    const exist_restaurant = await this.RestaurantRepo.findOne({
        where: { id: dto_data.restaurantId },
    });

    if (!exist_restaurant) {
        throw new ConflictException("Restaurant does not exist");
    }
    const product = this.ProductRepo.create({
        product_name: dto_data.product_name,
        price: dto_data.price,
        description: dto_data.description,
        restaurant: exist_restaurant, 
    });
        return await this.ProductRepo.save(product);
    }

// Update spcific Product --------------------------------------------
    async update_Product(id:number,dto_data:ProductDto):Promise<Product>{
        const product = await this.ProductRepo.findOne({
            where:{ id }
        })
        if(!product){
            throw new HttpException('Restaurant id Not found', HttpStatus.NOT_FOUND);
        }
        const updated_product =  Object.assign(product,dto_data) 
        return await this.ProductRepo.save(updated_product)
    }
// Delete spcific Product --------------------------------------------
    async delete_Product(id:number):Promise<Product>{
        const product = await this.ProductRepo.findOne({
            where:{ id }
        })
        if(!product){
            throw new HttpException('Product id Not found', HttpStatus.NOT_FOUND);
        }
        return await this.ProductRepo.remove(product)
    }



}