import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-tenant.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    try{
      const {username, password, role, full_name, email, phone, birth_date } = createUserDto;
      const newUser = await this.userModel.create({username, password, role, full_name, email, phone, birth_date});
      return newUser;
    } catch (error) {
      throw new Error("Fail create user");
    }
  }

  async findOne(username): Promise<User> {
    const user = await this.userModel.findOne({ where: { username } });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { id } });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const [affectedCount, updatedUser] = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true
    });
  
    if (affectedCount > 0 && updatedUser.length > 0)  return updatedUser[0];
    else return null;
  }

  async remove(id: string) {
    const user = await this.userModel.findOne({ where: { id } });
    if(!user) {
      return {
        message: 'User not found',
        status: 404
      }
    };
    return await this.userModel.destroy({ where: { id } });
  }
}