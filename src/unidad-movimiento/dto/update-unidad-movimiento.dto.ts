import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadMovimientoDto } from './create-unidad-movimiento.dto';

export class UpdateUnidadMovimientoDto extends PartialType(CreateUnidadMovimientoDto) {}
