import { Module } from '@nestjs/common';
import { ConceptoService } from './concepto.service';
import { ConceptoController } from './concepto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concepto } from './entities/concepto.entity';

@Module({
  controllers: [ConceptoController],
  providers: [ConceptoService],
  imports: [TypeOrmModule.forFeature([Concepto], 'tesoro')],
  exports: [ConceptoService]
})
export class ConceptoModule { }
