import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Tenant } from './entities/tenant.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TenantsRepository {
  constructor(
    @InjectModel(Tenant)
    private readonly tenantModel: typeof Tenant,
    private readonly sequelize: Sequelize,
  ) {}

  findAll() {
    return `This action returns all tenants`;
  }
  
  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const { username, password, company, role } = createTenantDto;

    const existingTenant = await this.tenantModel.findOne({
      where: { username }
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


  async findOne(username) {
    const tenant = await Tenant.findOne({ where: { username } });
    return tenant;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }

  async createSchema(company: string): Promise<void> {
    const schemaName = company;
  
    await this.sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
    await this.sequelize.query(`SET search_path TO ${schemaName}`);
  
    await this.sequelize.query(`SET search_path TO public`);
  }
}