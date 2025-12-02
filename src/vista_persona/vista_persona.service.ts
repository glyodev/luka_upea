import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VistaPersona } from './entities/vista_persona.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from 'src/common/enums/estado.enum';
import { TipoConceptoService } from 'src/tesoro/tipo-concepto/tipo-concepto.service';
import { DeudaService } from 'src/tesoro/deuda/deuda.service';
import { VistaMaeMatriculados } from './entities/mae-matriculados.entity';

@Injectable()
export class VistaPersonaService {
  constructor(
    @InjectRepository(VistaPersona, 'base_upea')
    private readonly vistaPersonaRepository: Repository<VistaPersona>,
    @InjectRepository(VistaMaeMatriculados, 'base_upea')
    private readonly vistaMaeMatriculadosRepository: Repository<VistaMaeMatriculados>,
    private readonly tipoConceptoService: TipoConceptoService,
    private readonly deudaService: DeudaService
  ) { }

  async findPersona(ci: string) {
    const persona: VistaPersona = await this.vistaPersonaRepository.findOne({
      where: {
        ci,
        estado: Estado.ACTIVO
      }
    });

    if (!persona) {
      throw new NotFoundException({
        success: false,
        message: "La persona con CI '" + ci + "' no existe en los registros",
        error: 'NotFoundException'
      })
    }

    const deudas = await this.deudaService.findAllByCi(ci)
    const tipo_concepto = await this.tipoConceptoService.findAllByNacionalidad(persona.nacionalidad)

    return {
      success: true,
      message: "Persona encontrada, listando deudas y pagos disponibles",
      data: {
        ci: persona.ci,
        nombres: persona.nombre,
        apellidos: `${persona.paterno} ${persona.materno}`,
        email: persona.email,
        deudas: deudas,
        tipo_pagos: tipo_concepto
      }
    }
  }

  async findOne(ci: string) {
    const persona = await this.vistaPersonaRepository.findOne({
      where: {
        ci,
        estado: Estado.ACTIVO
      }
    });

    if (!persona) {
      throw new NotFoundException({
        success: false,
        message: "La persona con CI '" + ci + "' no existe en los registros",
        error: 'NotFoundException'
      })
    }

    return persona
  }

  findOneByCi(ci: string) {
    return this.vistaPersonaRepository.findOne({
      where: {
        ci,
        estado: Estado.ACTIVO
      }
    });
  }
  findOneByCiRu(ci: string) {
    return this.vistaMaeMatriculadosRepository.findOne({
      where: {
        ci
      },
      order: {
        gestion: 'DESC'
      }
    });
  }
}
