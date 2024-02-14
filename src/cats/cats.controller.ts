import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cats')
@UseGuards(AuthGuard, RolesGuard)
export class CatsController {
    constructor(private catsService: CatsService) {}
    @Roles(['admin'])
    @Get()
    find() {
        return 'OK'
    }
}
