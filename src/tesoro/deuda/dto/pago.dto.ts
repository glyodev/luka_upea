import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { EstadoPago } from "src/common/enums/estado-pago.enum";

export class CreatePagoDto {
    @ApiProperty({ description: `Especifica el estado del pago: ${EstadoPago.PROCESADO}, ${EstadoPago.FALLIDO}, ${EstadoPago.ANULADO} y ${EstadoPago.EXPIRADO}`, required: true })
    @IsEnum(EstadoPago, {
        message: `El estado del pago es requerido y debe ser uno de los siguientes: ${EstadoPago.PROCESADO}, ${EstadoPago.FALLIDO}, ${EstadoPago.ANULADO} y ${EstadoPago.EXPIRADO}`
    })
    estado_pago: EstadoPago

    @ApiProperty({ description: 'Nota adicional de la deuda registrada', required: false })
    @IsOptional()
    @IsString({ message: 'La nota adicional debe ser un texto' })
    nota?: string
}
