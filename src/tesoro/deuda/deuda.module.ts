import { forwardRef, Module } from '@nestjs/common';
import { DeudaController } from './deuda.controller';
import { DeudaService } from './deuda.service';
import { OrdenModule } from '../orden/orden.module';
import { VistaPersonaModule } from 'src/vista_persona/vista_persona.module';
import { ConceptoModule } from '../concepto/concepto.module';

@Module({
  controllers: [DeudaController],
  imports: [
    OrdenModule,
    forwardRef(() => VistaPersonaModule),
    ConceptoModule
  ],
  providers: [DeudaService],
  exports: [DeudaService]
})
export class DeudaModule { }
