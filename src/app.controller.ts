import { Controller, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app') // 'app' prefix to all routes inside this controller.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('car')
  GetCars(): string {
    return this.appService.GetCars();
  }

  @Get('car/:id')
  GetCar(@Param('id') car_id:number): string {
    return this.appService.GetCar(car_id);
  }

  @Post('picture')
  CreatePhoto(): string {
  return this.appService.CreatePhoto();
  }

}
