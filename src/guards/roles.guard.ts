import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(roles)
    console.log(user)

    if (user && user.role) {
      return roles.includes(user.role);
    } else {
      throw new UnauthorizedException();
    }
  }
}