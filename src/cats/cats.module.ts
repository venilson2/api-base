import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from './entities/cat.model';

@Module({
    imports: [SequelizeModule.forFeature([Cat])],
    providers: [CatsService],
    controllers: [CatsController],
    exports: [CatsService],
})
export class CatsModule {}