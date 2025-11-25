import { Controller, Get, Post, Body, Patch, Param, Delete, Version } from '@nestjs/common';
import { UnidadMovimientoService } from './unidad-movimiento.service';
import { CreateUnidadMovimientoDto } from './dto/create-unidad-movimiento.dto';
import { UpdateUnidadMovimientoDto } from './dto/update-unidad-movimiento.dto';

@Controller('unidad-movimiento')
export class UnidadMovimientoController {
  // constructor(private readonly unidadMovimientoService: UnidadMovimientoService) {}

  // @Get()
  // @Version('1')
  // findAll() {
  //   return this.unidadMovimientoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.unidadMovimientoService.findOne(id);
  // }
}
