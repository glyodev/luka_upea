import { Injectable } from '@nestjs/common';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Repository } from 'typeorm';
import { Orden } from './entities/orden.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoPago } from 'src/common/enums/estado-pago.enum';

@Injectable()
export class OrdenService {
  constructor(
    @InjectRepository(Orden, process.env.NEST_DB_TESORO_NAME)
    private readonly ordenRepository: Repository<Orden>
  ) { }

  create(createOrdenDto: CreateOrdenDto) {
    return this.ordenRepository.save(createOrdenDto);
  }

  findAll() {
    return this.ordenRepository.find();
  }

  findAllCi(ci: string) {
    return this.ordenRepository.findBy({
      ci,
      eliminado_el: null
    });
  }
  findByCod(cod: string, ci?: string) {
    if (ci) {
      return this.ordenRepository.findOne({
        where: {
          codigo_pago: cod,
          eliminado_el: null,
          ci: ci
        },
        relations: ['concepto']
      });
    } else {
      return this.ordenRepository.findOne({
        where: {
          codigo_pago: cod,
          eliminado_el: null
        },
        relations: ['concepto']
      });

    }
  }

  findOne(id: number) {
    return this.ordenRepository.findOneBy({
      id,
      eliminado_el: null
    });
  }

  findOneByOrden(ci: string, id_concepto: number) {
    return this.ordenRepository.findOne({
      where: {
        ci,
        id_concepto,
        estado_pago: EstadoPago.EN_PROCESO,
        eliminado_el: null
      },
      relations: ['concepto']
    });
  }

  update(id: number, updateOrdenDto: UpdateOrdenDto) {
    return this.ordenRepository.update(id, updateOrdenDto);
  }

  remove(id: number) {
    return this.ordenRepository.update(id, {
      eliminado_el: new Date()
    });
  }
}
