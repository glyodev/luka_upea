import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config())

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VistaPersonaModule } from './vista_persona/vista_persona.module';
import { DeudaModule } from './tesoro/deuda/deuda.module';

import { join } from 'path';

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
      disableErrorMessages: false,
      exceptionFactory: (validationErrors = []) => {
        const formattedErrors = {};

        for (const error of validationErrors) {
          const constraints = Object.values(error.constraints || {});
          formattedErrors[error.property] = constraints[0];
        }

        return new BadRequestException({
          success: false,
          message: "Error al validar algunos campos.",
          errors: formattedErrors,
        });
      },
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Servicio de pagos en linea UPEA')
    .setDescription('Documentación técnica del servicio de pagos en linea de la UPEA')
    .setVersion('1.1')
    .addApiKey(
      { type: 'apiKey', name: 'x-api-key', in: 'header' },
      'x-api-key'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AppModule, VistaPersonaModule, DeudaModule
    ]
  });
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      // docExpansion: 'none',
      defaultModelsExpandDepth: 0,
    },
    customCss: `
      .swagger-ui .topbar .topbar-wrapper svg {
        display:;
      }
      .swagger-ui .topbar .topbar-wrapper::after {
        content: "Última actualización: 25/11/2025";
        color: #fff;
        font-size: 0.9rem;
        margin-left: auto;
      }
    `,
    customSiteTitle: 'Servicio de pagos | UPEA',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
