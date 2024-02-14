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

    if (user && user.roles) {
      const hasRole = user.roles.map((role: string) => roles.includes(role))
      return hasRole[0]
    } else {
      throw new UnauthorizedException();
    }
  }
}


