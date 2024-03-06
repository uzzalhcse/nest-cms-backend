import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors)
    })
  );
  await app.listen(3000);
}
bootstrap();
