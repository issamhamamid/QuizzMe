import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Request} from "express";
import {Reflector} from "@nestjs/core";
import {Role} from "../decorators/role.decorator";
import {UserService} from "../user/user.service";


@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: UserService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const payload: any = req.user;
        const forRole = this.reflector.get(Role, context.getHandler());

        if (!payload || !payload.username) {
            return false;
        }

        return this.userService.findById(payload.sub).then(response => {
            if (response) {
                return response.role === forRole;
            }
            return false; // Handle case where response is null/undefined
        });
    }
}