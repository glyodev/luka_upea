import { Injectable } from '@nestjs/common';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Repository } from 'typeorm';
import { Orden } from './entities/orden.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoPago } from 'src/common/enums/estado-pago.enum';
import { OrdenConcepto } from './entities/orden-concepto.entity';
import { CreateOrdenConceptoDto } from './dto/create-orden-concepto.dto';

@Injectable()
export class OrdenService {
  constructor(
    @InjectRepository(Orden, process.env.NEST_DB_TESORO_NAME)
    private readonly ordenRepository: Repository<Orden>,
    @InjectRepository(OrdenConcepto, process.env.NEST_DB_TESORO_NAME)
    private readonly ordenConceptoRepository: Repository<OrdenConcepto>,
  ) { }

  create(createOrdenDto: CreateOrdenDto) {
    return this.ordenRepository.save(createOrdenDto);
  }

  createConcepto(createOrdenConceptoDto: CreateOrdenConceptoDto) {
    return this.ordenConceptoRepository.save(createOrdenConceptoDto);
  }


  findAll() {
    return this.ordenRepository.find();
  }

  findAllCi(ci: string) {
    return this.ordenRepository.find({
      where: {
        ci,
        eliminado_el: null
      },
      relations: ['orden_concepto']
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
        relations: ['orden_concepto']
      });
    } else {
      return this.ordenRepository.findOne({
        where: {
          codigo_pago: cod,
          eliminado_el: null
        },
        relations: ['orden_concepto']
      });

    }
  }

  findOne(id: number) {
    return this.ordenRepository.findOne({
      where: {
        id,
        eliminado_el: null
      },
      relations: ['orden_concepto']
    });
  }

  async findOneByOrden(ci: string, id_concepto: number) {
    return await this.ordenRepository.findOne({
      where: {
        ci,
        estado_pago: EstadoPago.EN_PROCESO,
        eliminado_el: null,
        orden_concepto: {
          id_concepto: id_concepto
        }
      },
      relations: {
        orden_concepto: true
      }
    });
  }

  async findOneByCodigo(codigo_pago: string) {
    return await this.ordenRepository.findOne({
      where: {
        codigo_pago: codigo_pago,
        // estado_pago: EstadoPago.EN_PROCESO,
        eliminado_el: null
      },
      relations: {
        orden_concepto: true
      }
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
