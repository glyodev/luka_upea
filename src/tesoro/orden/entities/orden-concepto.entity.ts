import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Concepto } from "src/tesoro/concepto/entities/concepto.entity";
import { Orden } from "./orden.entity";

@Entity('luka_orden_concepto', { database: process.env.NEST_DB_TESORO_NAME })
export class OrdenConcepto {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_concepto: number

    @Column({ length: 255 })
    descripcion: string

    @Column()
    gestion: number

    @Column()
    carrera: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    monto_minimo: number

    @Column()
    id_orden: number

    @Column({ type: 'timestamp' })
    creado_el: Timestamp

    @ManyToOne(() => Concepto)
    @JoinColumn({ name: 'id_concepto' })
    concepto: Concepto

    @ManyToOne(() => Orden)
    @JoinColumn({ name: 'id_orden' })
    orden: Orden
}