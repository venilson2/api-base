import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    try{
      const newUser = await this.userModel.create({
        ...createUserDto
      });
      return newUser;
    } catch (error) {
      console.error(`Error in UsersRepository.create: ${error.message}`);
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
      console.log(`Error in UsersRepository.update: ${error.message}`)
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