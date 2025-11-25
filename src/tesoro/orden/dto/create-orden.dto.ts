import { IsDecimal, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { EstadoPago } from "src/common/enums/estado-pago.enum";

export class CreateOrdenDto {
    @IsString({ message: 'La descripción debe ser texto' })
    @MaxLength(255, { message: 'La descripción no puede superar los 255 caracteres' })
    descripcion: string

    @IsOptional()
    @IsString({ message: 'El QR debe ser texto' })
    @MaxLength(255, { message: 'El QR no puede superar los 255 caracteres' })
    qr?: string

    @IsNumber()
    id_persona: number

    @IsString({ message: 'El CI debe ser de tipo stexto mas extención (ej: C-12345678)' })
    @MinLength(6, { message: 'El CI debe ser un CI valido.' })
    ci: string

    @IsString({ message: 'El código de pago debe ser texto' })
    codigo_pago: string

    @IsOptional()
    @IsEnum(EstadoPago, {
        message: `El estado del pago es requerido y debe ser uno de los siguientes: ${EstadoPago.PROCESADO}, ${EstadoPago.FALLIDO}, ${EstadoPago.ANULADO} y ${EstadoPago.EXPIRADO}`
    })
    estado_pago?: EstadoPago

    @IsNumber()
    id_concepto: number

    @IsDecimal({ decimal_digits: '2' })
    monto_minimo: number

    @IsDecimal({ decimal_digits: '2' })
    comision: number

    @IsDecimal({ decimal_digits: '2' })
    monto_total: number

    @IsOptional()
    @IsString({ message: 'La nota adicional debe ser texto' })
    @MaxLength(255, { message: 'La nota adicional no puede superar los 255 caracteres' })
    nota_adicional?: string
}
