import { EstadoPago } from "src/common/enums/estado-pago.enum";
import { Concepto } from "src/tesoro/concepto/entities/concepto.entity";
import { VistaPersona } from "src/vista_persona/entities/vista_persona.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('luka_orden', { database: process.env.NEST_DB_TESORO_NAME })
export class Orden {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: string

    @Column({ nullable: true })
    qr: string

    @Column()
    id_persona: number

    @Column()
    ci: string

    @Column()
    codigo_pago: string

    @Column({ type: 'enum', enum: EstadoPago, default: EstadoPago.EN_PROCESO })
    estado_pago: EstadoPago

    @Column()
    id_concepto: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    monto_minimo: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    comision: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    monto_total: number

    @Column({ nullable: true })
    nota_adicional: string

    @Column({ type: 'timestamp' })
    creado_el: Timestamp

    @Column({ type: 'timestamp' })
    modificado_el: Timestamp

    @Column({ type: 'timestamp', nullable: true })
    eliminado_el: Timestamp

    @ManyToOne(() => Concepto)
    @JoinColumn({ name: 'id_concepto' })
    concepto: Concepto
}
