
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import * as dotenv from 'dotenv';
// dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // enable cors
    app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 7000);
}
bootstrap();
