import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoConcepto } from './entities/tipo-concepto.entity';
import { ConceptoService } from 'src/concepto/concepto.service';
// import { UnidadMovimientoService } from 'src/unidad-movimiento/unidad-movimiento.service';

@Injectable()
export class TipoConceptoService {
  constructor(
    @InjectRepository(TipoConcepto, 'tesoro')
    private readonly tipoConceptoRepository: Repository<TipoConcepto>,
    private readonly conceptoService: ConceptoService,
    // private readonly unidadMovimientoService: UnidadMovimientoService,
  ) { }

  async findAll() {
    const tipos = await this.tipoConceptoRepository.find()
    const tiposConcepto = []

    for (const element of tipos) {
      const conceptosAll = await this.conceptoService.findAllByOne(element.id);
      const conceptos = []
      for (const concepto of conceptosAll) {
        // const unidad = await this.unidadMovimientoService.findOne(concepto.unidadMovimiento_id)

        conceptos.push({
          // ...concepto,
          concepto: concepto.concepto,
          montoMinimo: concepto.montoMinimo,
          tipoNacionalidad: concepto.tipoNacionalidad,
          // unidad: unidad.descripcion
        })
      }
      tiposConcepto.push({
        // ...element,
        tipo: element.descripcion,
        conceptos
      });
    }

    return tiposConcepto
  }

  findOne(id: number) {
    return this.tipoConceptoRepository.findOne({
      where: {
        id
      }
    });
  }
}
