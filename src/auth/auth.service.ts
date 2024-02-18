import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TenantsService } from 'src/tenants/tenants.service';

@Injectable()
export class AuthService {
  constructor(
    private tenantsService: TenantsService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.tenantsService.findOne(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    };

    const payload = { id: user.id, username: user.username, role: user.role, company: user.company };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}