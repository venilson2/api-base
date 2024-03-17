import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    try{
      const users = await this.usersService.findAll();
      return users
    } catch (error){
      return error;
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const user = await this.usersService.findById(id);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      return error;
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return user
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      if (!user) throw new NotFoundException('User not found');
      return user
    } catch (error) {
      return error;
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