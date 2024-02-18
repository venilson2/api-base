import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cat } from './entities/cat.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class CatsService {
    constructor(
        @InjectModel(Cat)
        private readonly catModel: typeof Cat,
        private readonly sequelize: Sequelize,
      ) {}

    async getAll(): Promise<Cat[]> {
        return this.catModel.findAll();
    }

    async create(createCatDto: any, schema: string): Promise<Cat> {
        try {
            await this.sequelize.query(`SET search_path TO ${schema}`);
            const cat = await this.catModel.create(createCatDto);
            if (!cat) {
              throw new Error("Fail create cat");
            }
        
            return cat;
          } catch (error) {
            throw new Error("Fail create cat");
          }
    }
}
