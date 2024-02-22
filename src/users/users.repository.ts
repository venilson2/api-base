import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-tenant.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly sequelize: Sequelize,
  ) {}

  findAll() {
    return `This action returns all tenants`;
  }
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, role } = createUserDto;

    const newUser = await this.userModel.create({
      username,
      password,
      role,
    });

    return newUser;
  }

  async findOne(username): Promise<User> {
    const tenant = await User.findOne({ where: { username } });
    return tenant;
  }

  async findById(id): Promise<User> {
    const tenant = await User.findOne({ where: { id } });
    return tenant;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}