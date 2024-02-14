import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    create(createCatDto) {
        return 'This action adds a new cat';
    }
}
