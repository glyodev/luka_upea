import { Controller, Get, Post, Body, Patch, Param, Delete, Version } from '@nestjs/common';
import { TipoConceptoService } from './tipo-concepto.service';
import { CreateTipoConceptoDto } from './dto/create-tipo-concepto.dto';
import { UpdateTipoConceptoDto } from './dto/update-tipo-concepto.dto';

@Controller('tipo-concepto')
export class TipoConceptoController {
  constructor(
    private readonly tipoConceptoService: TipoConceptoService
  ) { }

  @Get()
  @Version('1')
  findAll() {
    return this.tipoConceptoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tipoConceptoService.findOne(id);
  }
}
