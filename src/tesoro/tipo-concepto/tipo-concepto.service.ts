import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoConcepto } from './entities/tipo-concepto.entity';
import { ConceptoService } from 'src/tesoro/concepto/concepto.service';
import { TipoNacionalidad } from 'src/common/enums/tipo-nacionalidad.enum';
// import { UnidadMovimientoService } from 'src/unidad-movimiento/unidad-movimiento.service';

@Injectable()
export class TipoConceptoService {
  constructor(
    @InjectRepository(TipoConcepto, process.env.NEST_DB_TESORO_NAME)
    private readonly tipoConceptoRepository: Repository<TipoConcepto>,
    private readonly conceptoService: ConceptoService,
    // private readonly unidadMovimientoService: UnidadMovimientoService,
  ) { }

  async findAllByNacionalidad(nacionalidad: string) {
    // Tipos de conceptos para listar
    const tipos = await this.tipoConceptoRepository.find()
    const tiposConcepto = []

    for (const element of tipos) {
      // Conceptos por tipos
      const conceptosAll = await this.conceptoService.findAllByOne(element.id);
      const conceptos = []
      for (const concepto of conceptosAll) {
        // Verifica si es de Bolivia para que solo liste conceptos de tipo ambos o nacionales
        if (nacionalidad === 'BOLIVIA') {
          if (concepto.tipoNacionalidad !== TipoNacionalidad.EXTRANJERO) {
            conceptos.push({
              id_concepto: concepto.id,
              concepto: concepto.concepto,
              monto_minimo: concepto.montoMinimo,
              tipo_nacionalidad: concepto.tipoNacionalidad,
            })
          }
        } else { // Extranjeros
          if (concepto.tipoNacionalidad === TipoNacionalidad.EXTRANJERO) {
            conceptos.push({
              id_concepto: concepto.id,
              concepto: concepto.concepto,
              monto_minimo: concepto.montoMinimo,
              tipo_nacionalidad: concepto.tipoNacionalidad,
            })
          }
        }
      }

      if (conceptos.length > 0) {
        tiposConcepto.push({
          tipo: element.descripcion,
          conceptos
        });
      }
    }

    // [0] Solo matriculacion (mientras)
    return tiposConcepto[0]
  }

  findOne(id: number) {
    return this.tipoConceptoRepository.findOne({
      where: {
        id
      }
    });
  }
}
