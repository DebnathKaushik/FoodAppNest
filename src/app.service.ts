import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello NestJS!';
  }

  GetCars(): string {
    return 'Cars Broomm Broomm!';
  }

  GetCar(car_id:number): string {
    return `${car_id} Car!`;
  }

  CreatePhoto(): string{
    return 'Post Picture !';
  }

}
