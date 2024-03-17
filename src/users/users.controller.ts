import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException, Res, HttpStatus, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[] | void> {
    try{
      const users = await this.usersService.findAll();
      return users
    } catch (error){
      return error
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { username, phone_number, email } = createUserDto;

    const existingUserByUsername = await this.usersService.findByUsername(username);
    if (existingUserByUsername)  throw new ConflictException('Username already exists');

    const existingUserByEmail = await this.usersService.findByEmail(email);
    if (existingUserByEmail) throw new ConflictException('E-mail already exists');

    const existingUserByPhoneNumber = await this.usersService.findByPhoneNumber(phone_number);
    if (existingUserByPhoneNumber) throw new ConflictException('Phone number already exists');

    return await this.usersService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User | void> {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      if (!user) throw new NotFoundException('User not found');
      return user
    } catch (error) {
      return error
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ) {
    try {
      const user = await this.usersService.remove(id);
      if (user === 0) throw new NotFoundException('User not found');
      return user
    } catch (error) {
      return error;
    }
  }
}