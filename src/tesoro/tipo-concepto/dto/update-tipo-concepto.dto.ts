import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoConceptoDto } from './create-tipo-concepto.dto';

export class UpdateTipoConceptoDto extends PartialType(CreateTipoConceptoDto) {}
