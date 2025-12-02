import { Estado } from "src/common/enums/estado.enum";
import { Expedido } from "src/common/enums/expedido.enum";
import { Genero } from "src/common/enums/genero.enum";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('vista_persona', { database: process.env.NEST_DB_BASE_UPEA_NAME })
export class VistaPersona {
    @PrimaryColumn()
    id: number;

    @Column()
    ci: string;

    @Column()
    expedido: Expedido;

    @Column()
    fecha_nac: Date;

    @Column()
    nombre: string;

    @Column()
    paterno: string;

    @Column()
    materno: string;

    @Column({ type: 'enum', enum: Genero })
    genero: Genero;

    @Column()
    email: string;

    @Column()
    celular: number;

    @Column()
    apellido_de_casado: string;

    @Column()
    nacionalidad: string;

    @Column()
    estado_civil: string;

    @Column()
    direccion: string;

    @Column()
    telefono: string;

    @Column({ type: 'enum', enum: Estado })
    estado: Estado;
}