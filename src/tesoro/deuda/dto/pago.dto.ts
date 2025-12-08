import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { IsDateFormat, IsTimestampFormat } from "src/common/decorators/is-date-format.decorator";
import { EstadoPago } from "src/common/enums/estado-pago.enum";

export class CreatePagoDto {
    @ApiProperty({ description: `Especifica el estado del pago: ${EstadoPago.PROCESADO}, ${EstadoPago.FALLIDO}, ${EstadoPago.ANULADO} y ${EstadoPago.EXPIRADO}`, required: true })
    @IsEnum(EstadoPago, {
        message: `El estado del pago es requerido y debe ser uno de los siguientes: ${EstadoPago.PROCESADO}, ${EstadoPago.FALLIDO}, ${EstadoPago.ANULADO} y ${EstadoPago.EXPIRADO}`
    })
    estado_pago: EstadoPago

    // @ApiProperty({ description: 'Codigo de la transacción' })
    // @IsOptional()
    // @IsString({ message: 'El codigo de la transacción debe ser un texto' })
    // codigo_transaccion?: string

    // @ApiProperty({ description: 'Expiración de la transacción, formato: YYYY-MM-DD HH:MM:SS' })
    // @IsOptional()
    // @IsTimestampFormat()
    // expiracion?: string

    @ApiProperty({ description: 'Nota adicional de la deuda registrada', required: false })
    @IsOptional()
    @IsString({ message: 'La nota adicional debe ser un texto' })
    nota?: string

    // @ApiProperty({ description: 'Codigo del QR generado', required: false })
    // @IsOptional()
    // @IsString({ message: 'El codigo del QR debe ser un texto' })
    // qr_codigo?: string
}
