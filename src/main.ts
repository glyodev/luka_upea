import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config())

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo 'api' para rutas de BackEnd NestJS
  app.setGlobalPrefix('api', {});

  // Habilitar el versionado del servicio
  // app.enableVersioning({
  //   type: VersioningType.URI
  // })

  app.useGlobalFilters()

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  // Validar los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Servicio de pagos en linea UPEA')
    .setDescription('Documentación técnica del servicio de pagos en linea de la UPEA')
    .setVersion('1.1')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AppModule
    ]
  });
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
