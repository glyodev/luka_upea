import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { OrdenService } from 'src/tesoro/orden/orden.service';
import { Orden } from '../orden/entities/orden.entity';
import { CreateDeudaDto } from './dto/deuda.dto';
import { VistaPersonaService } from 'src/vista_persona/vista_persona.service';
import { ConceptoService } from '../concepto/concepto.service';
import { CreateOrdenDto } from '../orden/dto/create-orden.dto';
import { EstadoPago, EstadoText, EstadoTextDetalle } from 'src/common/enums/estado-pago.enum';
import { UpdateOrdenDto } from '../orden/dto/update-orden.dto';
import { CreatePagoDto } from './dto/pago.dto';
import { Estado } from 'src/common/enums/estado.enum';
import { CreateOrdenConceptoDto } from '../orden/dto/create-orden-concepto.dto';

@Injectable()
export class DeudaService {
    constructor(
        @Inject(forwardRef(() => VistaPersonaService))
        private readonly vistaPersonaService: VistaPersonaService,
        private readonly ordenService: OrdenService,
        private readonly conceptoService: ConceptoService
    ) { }

    async findAllByCi(ci: string) {
        try {
            const deudas: Orden[] = await this.ordenService.findAllCi(ci);
            const deudasPersona = []

            for (const element of deudas) {
                if (element.estado_pago === EstadoPago.EN_PROCESO) {
                    const conceptos = []
                    for (const element2 of element.orden_concepto) {
                        conceptos.push({
                            id_concepto: element2.id_concepto,
                            descripcion: element2.descripcion,
                            gestion: element2.gestion,
                            carrera: element2.carrera,
                            monto_minimo: element2.monto_minimo
                        })
                    }
                    deudasPersona.push({
                        codigo_pago: element.codigo_pago,
                        descripcion: element.descripcion,
                        estado_pago: element.estado_pago,
                        monto_total: element.monto_total,
                        fecha_modificacion: element.modificado_el,
                        conceptos
                    })
                }
            }

            return deudasPersona
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: 'Error al obtener las deudas',
                error: 'InternalServerErrorException',
                data: error.message
            })
        }
    }

    async findByCi(ci: string) {
        const persona = await this.vistaPersonaService.findOneByCi(ci)

        if (!persona) {
            throw new NotFoundException({
                success: false,
                message: 'La persona con CI ' + ci + ' no existe en los registros',
                error: 'NotFoundException',
            })
        }

        try {
            const deudas: Orden[] = await this.ordenService.findAllCi(ci);
            const deudasPersona = []
            const historialPersona = []

            for (const element of deudas) {
                if (element.estado_pago === EstadoPago.EN_PROCESO) {
                    deudasPersona.push({
                        codigo_pago: element.codigo_pago,
                        descripcion: element.descripcion,
                        estado_pago: element.estado_pago,
                        monto_total: element.monto_total,
                        fecha_modificacion: element.modificado_el,
                        expiracion: element.expiracion,
                        conceptos: element.orden_concepto.map(element2 => ({
                            id_concepto: element2.id,
                            descripcion: element2.descripcion,
                            gestion: element2.gestion,
                            carrera: element2.carrera,
                            monto_minimo: element2.monto_minimo
                        }))
                    })
                } else {
                    historialPersona.push({
                        codigo_pago: element.codigo_pago,
                        descripcion: element.descripcion,
                        estado_pago: element.estado_pago,
                        monto_total: element.monto_total,
                        fecha_modificacion: element.modificado_el,
                        expiracion: element.expiracion,
                        conceptos: element.orden_concepto.map(element2 => ({
                            id_concepto: element2.id,
                            descripcion: element2.descripcion,
                            gestion: element2.gestion,
                            carrera: element2.carrera,
                            monto_minimo: element2.monto_minimo
                        }))
                    })
                }
            }

            return {
                success: true,
                message: 'Deudas pendientes',
                data: {
                    deudas: deudasPersona,
                    historial: historialPersona
                }
            }
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: 'Error al obtener las deudas',
                error: 'InternalServerErrorException',
                data: error.message
            })
        }
    }

    async findByCod(cod: string, ci: string) {
        const deuda: Orden = await this.ordenService.findByCod(cod, ci);
        let deudaPersona = {}

        if (!deuda) {
            throw new NotFoundException({
                success: false,
                message: 'Deuda no encontrada, revise los datos proporcionados',
                error: 'NotFoundException',
            })
        }

        try {
            deudaPersona = {
                codigo_pago: deuda.codigo_pago,
                descripcion: deuda.descripcion,
                estado_pago: deuda.estado_pago,
                monto_total: deuda.monto_total,
                fecha_modificacion: deuda.modificado_el,
                expiracion: deuda.expiracion,
                conceptos: deuda.orden_concepto.map(element => ({
                    id_concepto: element.id,
                    descripcion: element.descripcion,
                    gestion: element.gestion,
                    carrera: element.carrera,
                    monto_minimo: element.monto_minimo
                }))
            }

            return {
                success: true,
                message: 'La deuda N°' + deuda.codigo_pago + ' ' + EstadoTextDetalle[deuda.estado_pago],
                data: deudaPersona
            }
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: 'Error al obtener la deuda',
                error: 'InternalServerErrorException',
                data: error.message
            })
        }
    }

    async crearOrden(deuda: CreateDeudaDto) {
        // Verificar si ya existe una deuda similar para no crear otro
        const or = await this.ordenService.findOneByOrden(deuda.ci, deuda.id_concepto)
        if (or) {
            throw new ConflictException({
                success: false,
                message: 'Ya existe una deuda igual, complete el pago anterior antes de realizar uno nuevo',
                error: 'ConflictException',
                data: {
                    codigo_pago: or.codigo_pago,
                    descripcion: or.descripcion,
                    monto_total: or.monto_total,
                    estado_pago: or.estado_pago,
                    fecha_modificacion: or.modificado_el,
                    conceptos: or.orden_concepto.map(element => ({
                        id_concepto: element.id_concepto,
                        descripcion: element.descripcion,
                        gestion: element.gestion,
                        carrera: element.carrera,
                        monto_minimo: element.monto_minimo
                    }))
                }
            })
        }

        // Obtener info adicional
        const persona = await this.vistaPersonaService.findOne(deuda.ci);
        const matricula = await this.vistaPersonaService.findOneByCiRu(deuda.ci);

        // Buscar que el id_concepto exista
        const concepto = await this.conceptoService.findOne(deuda.id_concepto)
        if (!concepto) {
            throw new NotFoundException({
                success: false,
                message: 'Concepto no encontrado',
                error: 'NotFoundException',
            })
        }

        try {
            // Contar deudas para tener como correlativo
            const correlativo = await this.ordenService.findAll()

            // La fecha actual con hora 23:59:59 (expiracion que luka propone), si no lo agrega se pone este por defecto
            const now = new Date();
            const pad = (n: number) => n.toString().padStart(2, '0');
            const fecha = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} 23:59:59`;

            // Codigo unico, 4 ultimos digitos del ci y el correlativo
            const codigo = persona.ci.slice(-4) + (correlativo.length + 1).toString().padStart(4, '0')

            // Datos de la orden
            const nuevaOrden: CreateOrdenDto = {
                codigo_pago: codigo,
                descripcion: `Cta. ${persona.nombre} ${persona.paterno} ${persona.materno}`,
                ci: persona.ci,
                qr_codigo: deuda.qr_codigo, // opcional
                codigo_transaccion: deuda.codigo_transaccion, // opcional
                expiracion: deuda.expiracion ?? fecha, // opcional (pero fecha por defecto)
                comision: deuda.comision ?? 1, // opcional (pero por defecto 1bs)
                monto_total: concepto.montoMinimo + (deuda.comision ?? 1), // monto minimo mas la comision
                nota_adicional: deuda.nota, // opcional
            }

            // Guarda la deuda
            const orden = await this.ordenService.create(nuevaOrden);

            // Para casos de multiples pagos -> "mientras" solo guarda uno solo
            const nuevaOrdenConcepto: CreateOrdenConceptoDto = {
                id_concepto: concepto.id,
                descripcion: concepto.concepto,
                gestion: matricula.gestion + 1,
                carrera: matricula.carrera,
                monto_minimo: concepto.montoMinimo,
                id_orden: orden.id
            }
            const ordenConcepto = await this.ordenService.createConcepto(nuevaOrdenConcepto);

            // Retorna info de la deuda (opcional para luka)
            return {
                success: true,
                message: 'Deuda registrada correctamente',
                data: {
                    codigo_pago: orden.codigo_pago,
                    estudiante: `${persona.nombre} ${persona.paterno} ${persona.materno}`,
                    concepto: concepto.concepto,
                    monto_total: orden.monto_total,
                    fecha_modificacion: orden.modificado_el,
                    conceptos: [
                        {
                            id_concepto: ordenConcepto.id_concepto,
                            descripcion: ordenConcepto.descripcion,
                            gestion: ordenConcepto.gestion,
                            carrera: ordenConcepto.carrera,
                            monto_minimo: ordenConcepto.monto_minimo
                        }
                    ]
                }
            }
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: 'Error al crear la deuda',
                error: 'InternalServerErrorException',
                data: error.message
            })
        }
    }

    async pagarDeuda(ci: string, cod: string, pago: CreatePagoDto) {
        let orden = await this.ordenService.findByCod(cod, ci)

        if (!orden) {
            throw new NotFoundException({
                success: false,
                message: 'Deuda inexistente',
                error: 'NotFoundException'
            })
        }

        // Validar expiracion
        console.log(new Date(pago.expiracion));
        console.log(new Date());

        if (pago.expiracion) {
            if (new Date(pago.expiracion) < new Date()) {
                await this.ordenService.update(orden.id, {
                    estado_pago: EstadoPago.EXPIRADO
                })

                throw new BadRequestException({
                    success: false,
                    message: 'Esta deuda ya expiro',
                    error: 'BadRequestException',
                    data: {
                        codigo_pago: orden.codigo_pago,
                        descripcion: orden.descripcion,
                        monto_total: orden.monto_total,
                        estado_pago: EstadoPago.EXPIRADO,
                        fecha_deuda: orden.modificado_el,
                        expiracion: pago.expiracion ?? null,
                        conceptos: orden.orden_concepto.map(element => ({
                            id_concepto: element.id,
                            descripcion: element.descripcion,
                            gestion: element.gestion,
                            carrera: element.carrera,
                            monto_minimo: element.monto_minimo
                        }))
                    }
                })
            }
        }

        if (orden.estado_pago !== EstadoPago.EN_PROCESO) {
            throw new ConflictException({
                success: false,
                message: 'Esta deuda ya fue procesada',
                error: 'ConflictException',
                data: {
                    codigo_pago: orden.codigo_pago,
                    descripcion: orden.descripcion,
                    monto_total: orden.monto_total,
                    estado_pago: orden.estado_pago,
                    fecha_deuda: orden.modificado_el,
                    expiracion: pago.expiracion ?? null,
                    conceptos: orden.orden_concepto.map(element => ({
                        id_concepto: element.id,
                        descripcion: element.descripcion,
                        gestion: element.gestion,
                        carrera: element.carrera,
                        monto_minimo: element.monto_minimo
                    }))
                }
            })
        }

        const updateOrdenDto: UpdateOrdenDto = {
            estado_pago: pago.estado_pago,
            nota_adicional: pago.nota,
            expiracion: pago.expiracion,
            codigo_transaccion: pago.codigo_transaccion,
            qr_codigo: pago.qr_codigo
        }

        const update = await this.ordenService.update(orden.id, updateOrdenDto)

        if (update.affected === 0) {
            throw new BadRequestException({
                success: false,
                message: 'Error al efectuar el pago',
                error: 'BadRequestException'
            })
        }

        return {
            success: true,
            message: 'Pago procesado correctamente',
            data: {
                codigo_pago: orden.codigo_pago,
                descripcion: orden.descripcion,
                monto_total: orden.monto_total,
                estado_pago: pago.estado_pago,
                nota_adicional: pago.nota,
                fecha_deuda: new Date(),
                expiracion: pago.expiracion,
                conceptos: orden.orden_concepto
            }
        }
    }
}
