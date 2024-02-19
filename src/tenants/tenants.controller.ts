import { Controller, Post, Body } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantsService.create(createTenantDto);
  }

  @Post('create-schema')
  async createSchema(@Body() data: {username: string}){
    const { username } = data;
    return await this.tenantsService.createSchema(username);
  }
}