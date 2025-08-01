import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './Customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [CustomerModule,TypeOrmModule.forRoot(
    {
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'1234',
      database:'DemoPracties',
      autoLoadEntities:true,
      synchronize:true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
