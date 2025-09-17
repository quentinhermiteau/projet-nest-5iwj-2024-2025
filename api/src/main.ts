import {
  ConsoleLogger,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const options: NestApplicationOptions = {};

  if (process.env.NODE_ENV === 'production') {
    options.logger = new ConsoleLogger({
      json: true,
    });
  }

  const app = await NestFactory.create(AppModule, options);
  app.useGlobalPipes(new ValidationPipe());
  // app.use(helmet());
  app.enableCors({
    origin: process.env.FRONT_URL,
  });

  const config = new DocumentBuilder()
    .setTitle('Mon API')
    .setDescription('Description de mon API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
