import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { DeudaService } from './deuda.service';
import { ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreatePagoDto } from './dto/pago.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@ApiTags('Deuda')
@UseGuards(ApiKeyGuard)
@Controller('deuda')
export class DeudaController {
    constructor(private readonly deudaService: DeudaService) { }

    @Get('estudiante/:ci')
    @ApiOperation({ summary: 'Lista de todas las deudas de un estudiante' })
    @ApiParam({ name: 'ci', required: true, description: 'Cédula de identidad de la persona' })
    @ApiResponse({ status: 200, description: 'Devuelve una lista de las deudas de un estudiante segun si CI' })
    @ApiResponse({ status: 400, description: 'Error en la validación de datos' })
    @ApiResponse({ status: 401, description: 'Sin cabecera de autorizacion' })
    @ApiResponse({ status: 404, description: 'Estudiante no encontrada' })
    @ApiSecurity('x-api-key')
    async findAll(
        @Param('ci') ci: string,
        @Param('cod') cod?: string,
    ) {
        return this.deudaService.findByCi(ci);
    }

    @Get(':cod')
    @ApiOperation({ summary: 'Devuelve la información de una deuda' })
    @ApiParam({ name: 'cod', required: true, description: 'Código una deuda' })
    @ApiResponse({ status: 200, description: 'Devuelve la deuda de un estudiante segun si CI y/o el codigo de pago' })
    @ApiResponse({ status: 400, description: 'Error en la validación de datos' })
    @ApiResponse({ status: 401, description: 'Sin cabecera de autorizacion' })
    @ApiResponse({ status: 404, description: 'Estudiante o deuda no encontrada' })
    @ApiSecurity('x-api-key')
    async findOne(
        @Param('cod') cod?: string,
    ) {
        return this.deudaService.findByCod(cod);
    }

    @Put(':cod')
    @ApiOperation({ summary: 'Actualiza el registro de la deuda, estado del pago' })
    @ApiParam({ name: 'cod', required: true, description: 'Código de la deuda' })
    @ApiResponse({ status: 200, description: 'Deuda actualizada correctamente' })
    @ApiResponse({ status: 400, description: 'Error en la validación de datos' })
    @ApiResponse({ status: 404, description: 'Deuda inexistente' })
    @ApiResponse({ status: 409, description: 'Deuda ya procesada' })
    @ApiSecurity('x-api-key')
    pagarDeuda(@Param('cod') cod: string, @Body() pago: CreatePagoDto) {
        return this.deudaService.pagarDeuda(cod, pago)
    }
}