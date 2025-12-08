import { UUID } from "crypto";
import { EstadoPago } from "src/common/enums/estado-pago.enum";
import { Concepto } from "src/tesoro/concepto/entities/concepto.entity";
import { VistaPersona } from "src/vista_persona/entities/vista_persona.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { OrdenConcepto } from "./orden-concepto.entity";

@Entity('luka_orden', { database: process.env.NEST_DB_TESORO_NAME })
export class Orden {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    codigo_pago: string

    @Column()
    descripcion: string

    @Column()
    ci: string

    @Column({ nullable: true })
    qr_codigo?: string

    @Column({ nullable: true })
    codigo_transaccion?: string

    @Column({ type: 'timestamp', nullable: true })
    expiracion?: string

    @Column({ type: 'enum', enum: EstadoPago, default: EstadoPago.EN_PROCESO })
    estado_pago: EstadoPago

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 1.00 })
    comision?: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    monto_total: number

    @Column({ nullable: true })
    nota_adicional?: string

    @Column({ nullable: true })
    url_imagen?: string

    @Column({ type: 'timestamp' })
    creado_el: Timestamp

    @Column({ type: 'timestamp' })
    modificado_el: Timestamp

    @Column({ type: 'timestamp', nullable: true })
    eliminado_el?: Timestamp

    @Column({ type: 'uuid' })
    uuid: UUID

    @OneToMany(() => OrdenConcepto, ordenConcepto => ordenConcepto.orden)
    orden_concepto: OrdenConcepto[]
}
