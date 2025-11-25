export enum EstadoPago {
    PROCESADO = 'PROCESADO',
    EN_PROCESO = 'EN_PROCESO',
    EXPIRADO = 'EXPIRADO',
    FALLIDO = 'FALLIDO',
    ANULADO = 'ANULADO'
}

export enum EstadoText {
    PROCESADO = 'Procesado',
    EN_PROCESO = 'En proceso',
    EXPIRADO = 'Expirado',
    FALLIDO = 'Fallido',
    ANULADO = 'Anulado'
}

export enum EstadoTextDetalle {
    PROCESADO = 'a sido procesada exitosamente',
    EN_PROCESO = 'esta en proceso',
    EXPIRADO = 'esta expirada',
    FALLIDO = 'fallo inesperadamente',
    ANULADO = 'a sido anulada'
}