import { EstadoTesoro } from "src/common/enums/estado-tesoro.enum";
import { TipoNacionalidad } from "src/common/enums/tipo-nacionalidad.enum";
import { Column, Entity, PrimaryColumn, Timestamp } from "typeorm";

@Entity('concepto')
export class Concepto {
    @PrimaryColumn()
    id: number;

    @Column()
    concepto: string;

    @Column()
    montoMinimo: number;

    @Column({ type: 'enum', enum: TipoNacionalidad })
    tipoNacionalidad: TipoNacionalidad;

    @Column({ type: 'tinyint', enum: EstadoTesoro })
    estadoConcepto: EstadoTesoro;

    @Column()
    unidadMovimiento_id: number;

    // @Column({ type: 'timestamp' })
    // fechaCreacion: Timestamp;

    @Column()
    id_usuario: number;

    @Column()
    id_tipo: number;
}