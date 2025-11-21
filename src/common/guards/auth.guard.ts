import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express'
import { jwtConstants } from 'src/common/constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new BadRequestException('Sin cabecera de autorización')
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token, { secret: jwtConstants.secret }
      )

      request.user = payload
    } catch {
      throw new UnauthorizedException({
        success: false,
        statusCode: 401,
        message: 'Token inválido o expirado'
      })
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined;
  }
}
