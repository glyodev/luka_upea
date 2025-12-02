import { Module } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { OrdenController } from './orden.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orden } from './entities/orden.entity';
import { Concepto } from '../concepto/entities/concepto.entity';
import { OrdenConcepto } from './entities/orden-concepto.entity';

@Module({
  controllers: [OrdenController],
  providers: [OrdenService],
  imports: [
    TypeOrmModule.forFeature([Orden, OrdenConcepto, Concepto], process.env.NEST_DB_TESORO_NAME),
  ],
  exports: [OrdenService]
})
export class OrdenModule { }
