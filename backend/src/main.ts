import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost',
    exposedHeaders: 'Authorization',
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
