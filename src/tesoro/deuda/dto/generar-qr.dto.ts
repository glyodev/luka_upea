import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { IsTimestampFormat } from "src/common/decorators/is-date-format.decorator";

// Datos para generar directamente un QR de pago (luka)
export class CreateGenerarQrDto {
    @ApiProperty({ description: 'Codigo del pago de la deuda', required: true })
    @IsNumber({}, { message: 'El codigo de pago debe ser un numero' })
    codigo_pago: number

    // @ApiProperty({ description: 'Monto de la comisión', required: false })
    // @IsOptional()
    // @IsNumber({}, { message: 'La comisión debe ser un monto valido' })
    // comision?: number

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

    @ApiProperty({ description: 'URL de la imagen QR generada', required: false })
    @IsOptional()
    @IsString({ message: 'La URL debe ser un texto' })
    @MaxLength(255, { message: 'La URL no puede superar los 255 caracteres' })
    url_imagen?: string

    @ApiProperty({ description: 'Nota adicional de la deuda registrada', required: false })
    @IsOptional()
    @IsString({ message: 'La nota adicional debe ser un texto' })
    @MaxLength(255, { message: 'La nota no puede superar los 255 caracteres' })
    nota?: string
}
