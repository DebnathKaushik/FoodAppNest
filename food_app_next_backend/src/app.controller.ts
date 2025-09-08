import { Controller, Get, Post, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app') // 'app' prefix to all routes inside this controller.
export class AppController {
  constructor(private readonly appService: AppService) {}

}
