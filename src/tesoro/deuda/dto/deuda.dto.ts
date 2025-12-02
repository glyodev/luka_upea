import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDeudaDto {
    @ApiProperty({ description: 'Cédula de identidad de la persona', required: true })
    @IsString({ message: 'La cedula de identidad es obligatoria' })
    ci: string

    @ApiProperty({ description: 'ID de un concepto de pago', required: true })
    @IsNumber()
    id_concepto: number

    @ApiProperty({ description: 'Nota adicional de la deuda registrada', required: false })
    @IsOptional()
    @IsString({ message: 'La nota adicional debe ser un texto' })
    nota?: string
}
