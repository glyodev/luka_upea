import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { error } from 'console';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    private readonly validApiKey = process.env.NEST_API_KEY;

    canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        if (!apiKey || apiKey !== this.validApiKey) {
            throw new UnauthorizedException({
                success: false,
                message: 'Sin cabecera de autorizacion.',
                error: 'Unauthorized'
            });
        }

        return true;
    }
}
