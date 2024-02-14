import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
    imports: [CatsModule],
    providers: [CatsService],
    controllers: [CatsController],
    exports: [CatsService],
})
export class CatsModule {}