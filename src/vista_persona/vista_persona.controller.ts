import { Controller, Get, Post, Body, UseGuards, Param, Inject, forwardRef, Put } from '@nestjs/common';
import { VistaPersonaService } from './vista_persona.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { CreateDeudaDto } from 'src/tesoro/deuda/dto/deuda.dto';
import { DeudaService } from 'src/tesoro/deuda/deuda.service';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Estudiantes')
@UseGuards(ApiKeyGuard)
@Controller('estudiante')
export class VistaPersonaController {
  constructor(
    @Inject(forwardRef(() => DeudaService))
    private readonly deudaService: DeudaService,
    private readonly vistaPersonaService: VistaPersonaService,
  ) { }

  @Get(':ci')
  @ApiOperation({ summary: 'Muestra la información de un estudiante segun su CI, muestra sus deudas pendientes y los tipo asociados a los pagos permitidos' })
  @ApiResponse({ status: 200, description: 'Devuelve la información del estudiante' })
  @ApiResponse({ status: 401, description: 'Sin cabecera de autorizacion' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  @ApiSecurity('x-api-key')
  findPersona(@Param('ci') ci: string) {
    return this.vistaPersonaService.findPersona(ci);
  }

  @ApiOperation({ summary: 'Registrar deuda del estudiante' })
  @ApiResponse({ status: 201, description: 'Deuda registrada correctamente' })
  @ApiResponse({ status: 401, description: 'Sin cabecera de autorizacion' })
  @ApiResponse({ status: 400, description: 'Error en la validación de datos' })
  @ApiResponse({ status: 404, description: 'Estudiante o concepto no encontrado' })
  @ApiResponse({ status: 409, description: 'Ya existe una deuda igual' })
  @ApiSecurity('x-api-key')
  @Post()
  registrarDeuda(@Body() deuda: CreateDeudaDto) {
    return this.deudaService.crearOrden(deuda);
  }
}
