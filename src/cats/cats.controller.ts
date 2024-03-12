import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Tenant } from 'src/common/decorators/tenant.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cats')
@Controller('cats')
@UseGuards(AuthGuard, RolesGuard)
export class CatsController {
    constructor(private readonly catsService: CatsService) {}
    @Roles(['admin'])
    @Get()
    async getAll() {
        return this.catsService.getAll();
    }

    @Roles(['admin'])
    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() createCatDto: any, @Tenant('company') company: string) {
        const schema = company;
        return this.catsService.create(createCatDto, schema);
    }
}