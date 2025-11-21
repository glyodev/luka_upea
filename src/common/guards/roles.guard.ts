import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/common/decorators/roles.decorator';
import { ROLES_KEY } from 'src/common/decorators/user-roles.decorator';
import { Role } from 'src/common/enums/auth/role.enum';
import { UserRole } from 'src/common/enums/auth/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    const userRole = this.reflector.getAllAndOverride<UserRole>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!role) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    // Role ADMIN tiene todo el acceso
    if (user.sub.role === Role.ADMIN) {
      return true
    }

    if (role === Role.GUEST && user.sub.role) {
      return true
    }

    if (role === Role.TEC) {
      return true
    }

    // Role USER tiene acceso a las funciones de estudiante, docente y administrativo
    if (role === Role.USER) {
      if (userRole) {
        if (user.sub.role === Role.USER && user.sub.roles.includes(userRole)) {
          return true
        } else {
          throw new ForbiddenException({
            success: false,
            statusCode: 403,
            message: 'Acceso no autorizado. Permisos insuficientes!'
          })
        }
      } else {
        throw new NotFoundException({
          success: false,
          statusCode: 404,
          message: 'Ruta no protegida, falta rol de usuario'
        })
      }
    }

    // Otros Roles
    if (user.sub.role !== role) {
      throw new ForbiddenException({
        success: false,
        statusCode: 403,
        message: 'Acceso no autorizado'
      })
    }
  }
}