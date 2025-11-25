import { EstadoTesoro } from "src/common/enums/estado-tesoro.enum";
import { Column, Entity, PrimaryColumn, Timestamp } from "typeorm";

@Entity('tipo_concepto')
export class TipoConcepto {
    @PrimaryColumn()
    id: number

    @Column()
    descripcion: string

    @Column({ type: 'enum', enum: EstadoTesoro })
    estado: EstadoTesoro

    // @Column({ type: 'timestamp' })
    // fecha_creacion: Timestamp

    // @Column({ type: 'date' })
    // fecha_edicion: Date
}
