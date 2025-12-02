import { IsDecimal, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IsDateFormat, IsTimestampFormat } from "src/common/decorators/is-date-format.decorator";
import { EstadoPago } from "src/common/enums/estado-pago.enum";
import { Timestamp } from "typeorm";

export class CreateOrdenDto {
    @IsString({ message: 'El codigo debe ser texto' })
    @MaxLength(255, { message: 'El codigo del pago no puede superar los 255 caracteres' })
    codigo_pago: string

    @IsString({ message: 'La descripción debe ser texto' })
    @MaxLength(255, { message: 'La descripción no puede superar los 255 caracteres' })
    descripcion: string

    @IsString({ message: 'El CI debe ser de tipo stexto mas extención (ej: C-12345678)' })
    @MinLength(6, { message: 'El CI debe ser un CI valido.' })
    ci: string

    @IsOptional()
    @IsString({ message: 'El QR debe ser texto' })
    @MaxLength(255, { message: 'El QR no puede superar los 255 caracteres' })
    qr_codigo?: string

    @IsOptional()
    @IsString({ message: 'El codigo de transaccion debe ser texto' })
    @MaxLength(255, { message: 'El codigo de transacción no puede superar los 255 caracteres' })
    codigo_transaccion?: string

    @IsOptional()
    @IsTimestampFormat()
    expiracion?: string

    @IsOptional()
    @IsEnum(EstadoPago, {
        message: `El estado del pago es requerido y debe ser uno de los siguientes: ${EstadoPago.PROCESADO}, ${EstadoPago.FALLIDO}, ${EstadoPago.ANULADO} y ${EstadoPago.EXPIRADO}`
    })
    estado_pago?: EstadoPago

    @IsOptional()
    @IsDecimal({ decimal_digits: '2' })
    comision?: number

    @IsDecimal({ decimal_digits: '2' })
    monto_total: number

    @IsOptional()
    @IsString({ message: 'La nota adicional debe ser texto' })
    @MaxLength(255, { message: 'La nota adicional no puede superar los 255 caracteres' })
    nota_adicional?: string
}
