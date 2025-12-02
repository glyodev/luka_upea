import { IsDecimal, IsEnum, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IsDateFormat } from "src/common/decorators/is-date-format.decorator";
import { EstadoPago } from "src/common/enums/estado-pago.enum";
import { Timestamp } from "typeorm";
import { Orden } from "../entities/orden.entity";

export class CreateOrdenConceptoDto {
    @IsNumber({}, { message: 'El id del concepto debe ser un número' })
    id_concepto: number

    @IsString({ message: 'La descripción debe ser texto' })
    @MaxLength(255, { message: 'La descripción no puede superar los 255 caracteres' })
    descripcion: string

    @IsNumber({}, { message: 'La gestión debe ser un número' })
    gestion: number

    @IsString({ message: 'La carrera debe ser de tipo texto' })
    @MinLength(255, { message: 'La carrera no puede superar los 255 caracteres' })
    carrera: string

    @IsDecimal({ decimal_digits: '2' })
    monto_minimo: number

    @IsNumber({}, { message: 'El id de la orden debe ser un número' })
    id_orden: number
}
