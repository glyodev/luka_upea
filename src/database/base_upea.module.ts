import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VistaMaeMatriculados } from 'src/vista_persona/entities/mae-matriculados.entity';
import { VistaPersona } from 'src/vista_persona/entities/vista_persona.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.NEST_DB_BASE_UPEA_HOST,
      port: parseInt(process.env.NEST_DB_BASE_UPEA_PORT),
      username: process.env.NEST_DB_BASE_UPEA_USER,
      password: process.env.NEST_DB_BASE_UPEA_PASS,
      database: process.env.NEST_DB_BASE_UPEA_NAME,
      autoLoadEntities: false,
      synchronize: false,
      entities: [VistaPersona, VistaMaeMatriculados],
      name: 'base_upea'
    }),
  ],
})
export class BaseUpeaModule { }
