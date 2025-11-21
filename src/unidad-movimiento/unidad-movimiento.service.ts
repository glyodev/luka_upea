import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UnidadMovimiento } from './entities/unidad-movimiento.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UnidadMovimientoService {
  constructor(
    @InjectRepository(UnidadMovimiento, 'tesoro')
    private readonly unidadMovimientoRepository: Repository<UnidadMovimiento>,
  ) { }

  findAll() {
    return this.unidadMovimientoRepository.find()
  }

  findOne(id: number) {
    return this.unidadMovimientoRepository.findOneBy({ id })
  }
}
