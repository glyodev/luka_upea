import { Module } from '@nestjs/common';
import { UnidadMovimientoService } from './unidad-movimiento.service';
import { UnidadMovimientoController } from './unidad-movimiento.controller';
import { UnidadMovimiento } from './entities/unidad-movimiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UnidadMovimientoController],
  providers: [UnidadMovimientoService],
  imports: [
    TypeOrmModule.forFeature([UnidadMovimiento], process.env.NEST_DB_TESORO_NAME)
  ],
  exports: [UnidadMovimientoService]
})
export class UnidadMovimientoModule { }
