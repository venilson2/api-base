import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';
import { TenantsRepository } from './tenants.repository';

@Injectable()
export class TenantsService {
  constructor(
    private readonly tenantsRepository: TenantsRepository
  ) {}

  findAll() {
    return `This action returns all tenants`;
  }
  
  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    return await this.tenantsRepository.create(createTenantDto);
  }

  async findOne(username) {
    return this.findOne(username);
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }

  async createSchema(username: string): Promise<void>{
    const tenant = await this.tenantsRepository.findOne(username);

    if(!tenant){
      throw new Error("Tenant not found");
    }

    return this.tenantsRepository.createSchema(tenant.company);
  }
}
