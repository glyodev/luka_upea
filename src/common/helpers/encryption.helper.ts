import * as CryptoJS from 'crypto-js'
import { keys } from '../constants/keys.constants'

export function encrypt(text: string): string {
    const encrypted = CryptoJS.AES.encrypt(text, keys.encryption).toString();

    return encrypted
}

export function encryptCode(correlativo: number, numeroDocumento: string): string {
    const encrypted = CryptoJS.AES.encrypt(`${correlativo}_${numeroDocumento}_${obtenerFechaActual()}`, keys.encryption).toString();

    return encrypted
}

export function decrypt(encryptedText: string): string {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, keys.encryption);

    return decrypted.toString(CryptoJS.enc.Utf8);
}

function obtenerFechaActual() {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const day = String(fecha.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
}