import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VistaPersona } from './entities/vista_persona.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindPersonaDto } from './dto/find-persona.dto';
import { Estado } from 'src/common/enums/estado.enum';
import { TipoConceptoService } from 'src/tipo-concepto/tipo-concepto.service';

@Injectable()
export class VistaPersonaService {
  constructor(
    @InjectRepository(VistaPersona, 'base_upea')
    private readonly vistaPersonaRepository: Repository<VistaPersona>,
    private readonly tipoConceptoService: TipoConceptoService
  ) { }

  async findPersona(data: FindPersonaDto) {
    const persona = await this.vistaPersonaRepository.findOne({
      where: {
        ci: data.ci,
        estado: Estado.ACTIVO
      }
    });

    if (!persona) {
      throw new NotFoundException({
        success: false,
        message: "La persona con CI '" + data.ci + "' no existe en los registros",
        error: 'Persona not Found'
      })
    }

    const tipo_concepto = await this.tipoConceptoService.findAll()

    return {
      success: true,
      message: "Persona encontrada, listando tipos de pagos,",
      data: {
        persona: {
          ci: persona.ci,
          nombres: persona.nombre,
          apellidos: `${persona.paterno} ${persona.materno}`,
          email: persona.email,
        },
        tipo_pagos: tipo_concepto
      }
    }
  }
}
