import { Controller, Get, Post, Body, Patch, Param, Delete, Version } from '@nestjs/common';
import { ConceptoService } from './concepto.service';
import { CreateConceptoDto } from './dto/create-concepto.dto';
import { UpdateConceptoDto } from './dto/update-concepto.dto';

@Controller('concepto')
export class ConceptoController {
  constructor(private readonly conceptoService: ConceptoService) {}

  @Get()
  @Version('1')
  findAll() {
    return this.conceptoService.findAll();
  }

  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: number) {
    return this.conceptoService.findOne(id);
  }
}
