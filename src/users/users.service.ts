import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async create(createUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    createUserDto.password = hashedPassword;
    const newUser = await  this.usersRepository.create(createUserDto);
    return newUser;
  }
}
