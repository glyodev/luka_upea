import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BaseUpeaModule } from './database/base_upea.module';
import { TesoroModule } from './database/tesoro.module';
import { VistaPersonaModule } from './vista_persona/vista_persona.module';
import { OrdenModule } from './orden/orden.module';

@Module({
  imports: [
    // Configuracion de .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),

    // Bases de datos
    TesoroModule, // Base de datos 'Tesoro'
    BaseUpeaModule, // Base de tatos 'Base UPEA'

    // Modulos
    VistaPersonaModule, OrdenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
