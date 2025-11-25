import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrdenService } from 'src/tesoro/orden/orden.service';
import { Orden } from '../orden/entities/orden.entity';
import { CreateDeudaDto } from './dto/deuda.dto';
import { VistaPersonaService } from 'src/vista_persona/vista_persona.service';
import { ConceptoService } from '../concepto/concepto.service';
import { CreateOrdenDto } from '../orden/dto/create-orden.dto';
import { EstadoPago, EstadoText } from 'src/common/enums/estado-pago.enum';
import { UpdateOrdenDto } from '../orden/dto/update-orden.dto';
import { CreatePagoDto } from './dto/pago.dto';

@Injectable()
export class DeudaService {
    constructor(
        @Inject(forwardRef(() => VistaPersonaService))
        private readonly vistaPersonaService: VistaPersonaService,
        private readonly ordenService: OrdenService,
        private readonly conceptoService: ConceptoService
    ) { }

    async findByCi(ci: string) {
        const persona = await this.vistaPersonaService.findOneByCi(ci)

        if (!persona) {
            throw new NotFoundException({
                success: false,
                message: 'La persona con CI ' + ci + ' no existe en los registros',
                error: 'NotFoundException',
            })
        }

        const deudas: Orden[] = await this.ordenService.findAllCi(ci);
        const deudasPersona = []

        for (const element of deudas) {
            if (element.estado_pago === EstadoPago.EN_PROCESO) {
                deudasPersona.push({
                    codigo_pago: element.codigo_pago,
                    descripcion: element.descripcion,
                    estado_pago: element.estado_pago,
                    monto_total: element.monto_total,
                    fecha: element.creado_el
                })
            }
        }

        return {
            success: true,
            message: deudasPersona.length > 0 ? 'Deudas pendientes' : 'Sin deudas pendientes',
            data: deudasPersona
        }
    }

    async findByCod(cod: string, ci?: string) {
        const deuda: Orden = await this.ordenService.findByCod(cod, ci);
        let deudaPersona = {}

        if (!deuda) {
            throw new NotFoundException({
                success: false,
                message: 'Deuda no encontrada',
                error: 'NotFoundException',
            })
        }

        if (deuda.estado_pago === EstadoPago.EN_PROCESO) {
            deudaPersona = {
                codigo_pago: deuda.codigo_pago,
                descripcion: deuda.descripcion,
                concepto: deuda.concepto.concepto,
                estado_pago: deuda.estado_pago,
                monto_total: deuda.monto_total,
                fecha: deuda.creado_el
            }
        }

        return {
            success: true,
            message: 'Deuda N°' + deuda.codigo_pago + '. ' + EstadoText[deuda.estado_pago],
            data: deudaPersona
        }
    }

    async crearOrden(deuda: CreateDeudaDto) {
        const or = await this.ordenService.findOneByOrden(deuda.ci, deuda.id_concepto)

        if (or) {
            throw new ConflictException({
                success: false,
                message: 'Ya existe una deuda igual, complete el pago anterior antes de realizar uno nuevo',
                error: 'ConflictException',
                data: {
                    codigo_pago: or.codigo_pago,
                    descripcion: or.descripcion,
                    concepto: or.concepto.concepto,
                    monto_total: or.monto_total,
                    estado_pago: or.estado_pago,
                    fecha: or.creado_el
                }
            })
        }

        const persona = await this.vistaPersonaService.findOne(deuda.ci);
        const concepto = await this.conceptoService.findOne(deuda.id_concepto)

        if (!concepto) {
            throw new NotFoundException({
                success: false,
                message: 'Concepto no encontrado',
                error: 'NotFoundException',
            })
        }

        const correlativo = await this.ordenService.findAll()

        const nuevaOrden: CreateOrdenDto = {
            descripcion: `Cta. ${persona.nombre} ${persona.paterno} ${persona.materno}`,
            qr: deuda.qr,
            id_persona: persona.id,
            ci: persona.ci,
            codigo_pago: persona.ci.slice(-4) + (correlativo.length + 1).toString().padStart(4, '0'),
            id_concepto: concepto.id,
            monto_minimo: concepto.montoMinimo,
            comision: 1.00,
            monto_total: concepto.montoMinimo + 1.00,
            nota_adicional: deuda.nota,
        }

        const orden = await this.ordenService.create(nuevaOrden);
        return {
            success: true,
            message: 'Deuda registrada correctamente',
            data: {
                codigo_pago: orden.codigo_pago,
                estudiante: `${persona.nombre} ${persona.paterno} ${persona.materno}`,
                concepto: concepto.concepto,
                monto_total: orden.monto_total,
                fecha: orden.creado_el
            }
        }
    }

    async pagarDeuda(ci: string, cod: string, pago: CreatePagoDto) {
        const orden = await this.ordenService.findByCod(cod, ci)

        if (!orden) {
            throw new NotFoundException({
                success: false,
                message: 'Deuda inexistente',
                error: 'NotFoundException'
            })
        }

        if (orden.estado_pago !== EstadoPago.EN_PROCESO) {
            throw new ConflictException({
                success: false,
                message: 'Esta deuda ya fue procesada',
                error: 'ConflictException',
                data: {
                    codigo_pago: orden.codigo_pago,
                    descripcion: orden.descripcion,
                    concepto: orden.concepto.concepto,
                    monto_total: orden.monto_total,
                    estado_pago: orden.estado_pago,
                    fecha_pago: orden.modificado_el
                }
            })
        }

        const updateOrdenDto: UpdateOrdenDto = {
            estado_pago: pago.estado_pago,
            nota_adicional: pago.nota
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
                concepto: orden.concepto.concepto,
                monto_total: orden.monto_total,
                estado_pago: orden.estado_pago,
                fecha_pago: new Date()
            }
        }
    }
}