import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber, IsOptional, IsString } from "class-validator";
import { IsTimestampFormat } from "src/common/decorators/is-date-format.decorator";

// Datos que LUKA debe registrar en el POST (algunos opcionales se llenan automaticamente)
export class CreateDeudaDto {
    @ApiProperty({ description: 'Cédula de identidad de la persona', required: true })
    @IsString({ message: 'La cedula de identidad es obligatoria' })
    ci: string

    @ApiProperty({ description: 'ID de un concepto de pago', required: true })
    @IsNumber()
    id_concepto: number

    @ApiProperty({ description: 'Monto de la comisión', required: false })
    @IsOptional()
    @IsNumber({}, { message: 'La comisión debe ser un número decimal con dos decimales' })
    comision?: number

    @ApiProperty({ description: 'Expiración de la transacción, formato: YYYY-MM-DD HH:MM:SS', required: false })
    @IsOptional()
    @IsTimestampFormat()
    expiracion?: string

    @ApiProperty({ description: 'Codigo del QR generado', required: false })
    @IsOptional()
    @IsString({ message: 'El codigo del QR debe ser un texto' })
    qr_codigo?: string

    @ApiProperty({ description: 'Codigo de la transacción', required: false })
    @IsOptional()
    @IsString({ message: 'El codigo de la transacción debe ser un texto' })
    codigo_transaccion?: string

    @ApiProperty({ description: 'Nota adicional de la deuda registrada', required: false })
    @IsOptional()
    @IsString({ message: 'La nota adicional debe ser un texto' })
    nota?: string
}
