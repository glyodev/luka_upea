import { IsString, MinLength } from "class-validator";
import { IsDateFormat } from "src/common/decorators/is-date-format.decorator";
// import { Expedido } from "src/modules/ppe/usuarios/users/common/enums/expedido.enum";

export class FindPersonaDto {
    @IsString({ message: 'El CI debe ser de tipo texto mas extención (ej: C-12345678)' })
    @MinLength(6, { message: 'El CI debe ser un CI valido.' })
    ci: string;
}