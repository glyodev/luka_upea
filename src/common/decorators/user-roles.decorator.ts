import { SetMetadata } from "@nestjs/common"
import { UserRole } from "../enums/auth/user-role.enum"

export const ROLES_KEY = 'roles'

export const UserRoles = (userRole: UserRole) => SetMetadata(ROLES_KEY, userRole)