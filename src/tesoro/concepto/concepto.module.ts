import { Module } from '@nestjs/common';
import { ConceptoService } from './concepto.service';
import { ConceptoController } from './concepto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concepto } from './entities/concepto.entity';

@Module({
  controllers: [ConceptoController],
  providers: [ConceptoService],
  imports: [TypeOrmModule.forFeature([Concepto], process.env.NEST_DB_TESORO_NAME)],
  exports: [ConceptoService]
})
export class ConceptoModule { }
