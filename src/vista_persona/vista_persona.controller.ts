import { Controller, Get, Post, Body, Patch, Param, Delete, Version, UseGuards } from '@nestjs/common';
import { VistaPersonaService } from './vista_persona.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { FindPersonaDto } from './dto/find-persona.dto';

@Controller('persona')
export class VistaPersonaController {
  constructor(private readonly vistaPersonaService: VistaPersonaService) { }

  @Post()
  @UseGuards(ApiKeyGuard)
  findPersona(@Body() persona: FindPersonaDto) {
    return this.vistaPersonaService.findPersona(persona);
  }
}
