import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Op } from 'sequelize';
import { OrderItem } from 'sequelize';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(
    page: number, 
    limit: number, 
    sortBy: string, 
    sortDirection: 'ASC' | 'DESC', 
    filter: string
  ): Promise<{ rows: User[]; count: number }> {
    const offset = (page - 1) * limit;
    let whereClause: any = {}; 
  
    if (filter) {
      whereClause = {
        [Op.or]: [
          { username: { [Op.like]: `%${filter}%` } }, 
          { email: { [Op.like]: `%${filter}%` } },    
          { phone_number: { [Op.like]: `%${filter}%` } }, 
        ]
      };
    }
  
    const order: OrderItem[] = [[sortBy, sortDirection]];
    const { rows, count } = await this.userModel.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order,
    });
  
    return { rows, count };
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    try{
      const newUser = await this.userModel.create({
        ...createUserDto
      });
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async findByUsername(username): Promise<User> {
    try {
      const user = await this.userModel.findOne({ where: { username } });
      return user;
    } catch (error) {
      return error;
    }
  }

  async findByEmail(email): Promise<User> {
    try {
      const user = await this.userModel.findOne({ where: { email } });
      return user;
    } catch (error) {
      return error
    }
  }

  async findByPhoneNumber(phone_number): Promise<User> {
    try {
      const user = await this.userModel.findOne({ where: { phone_number } });
      return user;
    } catch (error) {
      return error
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ 
        where: { id }
      });
      return user;
    } catch (error) {
      return error
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    try {
      const [affectedCount, updatedUser] = await this.userModel.update(updateUserDto, {
        where: { id },
        returning: true
      });
    
      if (affectedCount > 0 && updatedUser.length > 0)  return updatedUser[0];
      else return null;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      return await this.userModel.destroy({ where: { id } });
    } catch (error) {
      console.log(`Error in UsersRepository.remove: ${error.message}`)
      throw error;
    }
  }
}