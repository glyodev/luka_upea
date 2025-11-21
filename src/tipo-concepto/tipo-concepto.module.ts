import { Module } from '@nestjs/common';
import { TipoConceptoService } from './tipo-concepto.service';
import { TipoConceptoController } from './tipo-concepto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoConcepto } from './entities/tipo-concepto.entity';
import { ConceptoModule } from 'src/concepto/concepto.module';
import { UnidadMovimientoModule } from 'src/unidad-movimiento/unidad-movimiento.module';

@Module({
  controllers: [TipoConceptoController],
  providers: [TipoConceptoService],
  imports: [
    TypeOrmModule.forFeature([TipoConcepto], 'tesoro'),
    ConceptoModule,
    UnidadMovimientoModule
  ],
  exports: [TipoConceptoService]
})
export class TipoConceptoModule { }
