import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BaseUpeaModule } from './database/base_upea.module';
import { TesoroModule } from './database/tesoro.module';
import { VistaPersonaModule } from './vista_persona/vista_persona.module';
import { OrdenModule } from './tesoro/orden/orden.module';
import { DeudaModule } from './tesoro/deuda/deuda.module';
import { ConceptoModule } from './tesoro/concepto/concepto.module';
import { TipoConceptoModule } from './tesoro/tipo-concepto/tipo-concepto.module';
import { UnidadMovimientoModule } from './tesoro/unidad-movimiento/unidad-movimiento.module';

@Module({
  imports: [
    // Configuracion de .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),

    // Bases de datos
    TesoroModule, // Base de datos Tesoreria
    BaseUpeaModule, // Base de tatos 'Base UPEA'

    // Modulos
    VistaPersonaModule,
    ConceptoModule, TipoConceptoModule, UnidadMovimientoModule,
    DeudaModule, OrdenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
