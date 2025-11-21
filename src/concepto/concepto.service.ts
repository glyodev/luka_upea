import { Injectable } from '@nestjs/common';
import { CreateConceptoDto } from './dto/create-concepto.dto';
import { UpdateConceptoDto } from './dto/update-concepto.dto';
import { Repository } from 'typeorm';
import { Concepto } from './entities/concepto.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ConceptoService {
  constructor(
    @InjectRepository(Concepto, 'tesoro')
    private readonly conceptoService: Repository<Concepto>
  ) { }

  findAll() {
    return this.conceptoService.find()
  }

  findAllByOne(id_tipo: number) {
    return this.conceptoService.findBy({ id_tipo })
  }

  findOne(id: number) {
    return this.conceptoService.findOneBy({ id })
  }
}
