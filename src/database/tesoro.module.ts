import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concepto } from 'src/tesoro/concepto/entities/concepto.entity';
import { Orden } from 'src/tesoro/orden/entities/orden.entity';
import { TipoConcepto } from 'src/tesoro/tipo-concepto/entities/tipo-concepto.entity';
import { UnidadMovimiento } from 'src/tesoro/unidad-movimiento/entities/unidad-movimiento.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.NEST_DB_TESORO_HOST,
            port: parseInt(process.env.NEST_DB_TESORO_PORT),
            username: process.env.NEST_DB_TESORO_USER,
            password: process.env.NEST_DB_TESORO_PASS,
            database: process.env.NEST_DB_TESORO_NAME,
            autoLoadEntities: false,
            synchronize: false,
            timezone: 'Z',
            entities: [
                TipoConcepto, Concepto, UnidadMovimiento, Orden
            ],
            name: process.env.NEST_DB_TESORO_NAME
        }),
    ],
})
export class TesoroModule { }
