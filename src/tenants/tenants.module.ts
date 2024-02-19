import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tenant } from './entities/tenant.entity';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { TenantsRepository } from './tenants.repository';

@Module({
  imports: [SequelizeModule.forFeature([Tenant])],
  controllers: [TenantsController],
  providers: [TenantsService, TenantsRepository],
  exports: [TenantsService],
})
export class TenantsModule {}
