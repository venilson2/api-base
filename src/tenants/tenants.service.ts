import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(Tenant)
    private readonly tenantModel: typeof Tenant
  ) {}
  
  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const { username, password, company, role } = createTenantDto;

    const existingTenant = await this.tenantModel.findOne({
      where: { username },
    });
    if (existingTenant) {
      throw new BadRequestException('A tenant with this username already exists.');
    }

    const newTenant = await this.tenantModel.create({
      username,
      password,
      company,
      role,
    });

    return newTenant;
  }

  findAll() {
    return `This action returns all tenants`;
  }

  async findOne(username) {
    const tenant = await Tenant.findOne({where: { username: username}});
    return tenant;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
