import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Role } from "src/common/enums/auth/role.enum";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "./roles.decorator";
import { UserRole } from "../enums/auth/user-role.enum";
import { UserRoles } from "./user-roles.decorator";

export function Auth(role: Role, userRole: UserRole = null) {
    return applyDecorators(
        Roles(role),
        UserRoles(userRole),
        UseGuards(AuthGuard, RolesGuard)
    )
}