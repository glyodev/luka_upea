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

    @Get(':ci/:cod')
    @ApiOperation({ summary: 'Lista de deudas de un estudiante' })
    @ApiParam({ name: 'ci', required: true, description: 'Cédula de identidad de la persona' })
    @ApiParam({ name: 'cod', required: true, description: 'Código una deuda' })
    @ApiResponse({ status: 200, description: 'Devuelve una lista de las deudas de un estudiante segun si CI y/o el codigo de pago' })
    @ApiResponse({ status: 400, description: 'Error en la validación de datos' })
    @ApiResponse({ status: 401, description: 'Sin cabecera de autorizacion' })
    @ApiResponse({ status: 404, description: 'Estudiante o deuda no encontrada' })
    @ApiSecurity('x-api-key')
    async findOne(
        @Param('ci') ci: string,
        @Param('cod') cod: string,
    ) {
        // Validación de parámetros
        // if (!ci && !cod) {
        //     throw new BadRequestException({
        //         success: false,
        //         message: 'Ningún parámetro de búsqueda',
        //         error: 'BadRequestException'
        //     });
        // }

        // if (cod && ci) {
        return this.deudaService.findByCod(cod, ci);
        // }
    }

    @Put(':ci/:cod')
    @ApiOperation({ summary: 'Actualiza el registro de la deuda' })
    @ApiParam({ name: 'ci', required: true, description: 'Cedula de identidad del estudiante' })
    @ApiParam({ name: 'cod', required: true, description: 'Código de la deuda' })
    @ApiResponse({ status: 200, description: 'Deuda actualizada correctamente' })
    @ApiResponse({ status: 400, description: 'Error en la validación de datos' })
    @ApiResponse({ status: 404, description: 'Deuda inexistente' })
    @ApiSecurity('x-api-key')
    pagarDeuda(@Param('ci') ci: string, @Param('cod') cod: string, @Body() pago: CreatePagoDto) {
        return this.deudaService.pagarDeuda(ci, cod, pago)
    }
}
