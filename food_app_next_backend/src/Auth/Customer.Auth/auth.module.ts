// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import * as dotenv from 'dotenv';
import { Customer } from 'src/Customer/Entities/Customer.entity';
import { PusherModule } from 'src/pusher/pusher.module';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    JwtModule.register({
      secret: process.env.MY_SECRET2,  
      signOptions: { expiresIn: '2h' },
    }),
    PusherModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class CustomerAuthModule {}
