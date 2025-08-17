import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './Customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from './Restaurants/restaurant.module';
import { ProductModule } from './Products/product.module';
import { AuthModule } from './Auth/Restaurant.Auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();



@Module({
  imports: [CustomerModule,RestaurantModule,ProductModule,AuthModule,TypeOrmModule.forRoot(
    {
      type:'postgres',
      host:process.env.DB_HOST,
      port:Number(process.env.DB_PORT),
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASS,
      database:process.env.DATABASE,
      autoLoadEntities:true,
      synchronize:true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
