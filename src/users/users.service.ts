import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password } = createUserDto;

      const hashedPassword = await bcrypt.hash(password, 10);
      createUserDto.password = hashedPassword;
      const newUser = await  this.usersRepository.create(createUserDto);
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async findByUsername(username: string) {
    return await this.usersRepository.findByUsername(username);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async findByPhoneNumber(phone_number: string) {
    return await this.usersRepository.findByPhoneNumber(phone_number);
  }

  async findById(id: string) {
    return await this.usersRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
  
    const hashedPassword = await bcrypt.hash(password, 10);
    updateUserDto.password = hashedPassword;
   
    const updatedUser = await this.usersRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.usersRepository.remove(id);
    return user;
  }
}
