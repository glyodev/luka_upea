import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('vista_mae_matriculados_actual', { database: process.env.NEST_DB_BASE_UPEA_NAME })
export class VistaMaeMatriculados {
    @PrimaryColumn()
    id_persona: number

    @Column()
    ci: string

    @Column()
    registro_universitario: string

    @Column()
    carrera: string

    @Column()
    sede: string

    @Column()
    gestion: number
}