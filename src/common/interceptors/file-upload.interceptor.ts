import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const fileUploadInterceptor = (fieldName: string, destino: string) =>
    FileInterceptor(fieldName, {
        storage: diskStorage({
            destination: `./uploads/${destino}`,
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
        fileFilter: (req, file, callback) => {
            // Filtrar por tipo de archivo
            if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
                callback(null, true);
            } else {
                callback(new Error('Solo se permiten archivos de imagen o PDF'), false);
            }
        },
        limits: {
            fileSize: 10 * 1024 * 1024, // Límite de tamaño: 10 MB en bytes
        },
    });
