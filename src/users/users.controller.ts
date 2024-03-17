import { Controller, Post, Body, Get, Param, Put, Delete, NotFoundException, Res, HttpStatus } from '@nestjs/common';
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
  async findAll(@Res() res: Response): Promise<User[] | void> {
    try{
      const users = await this.usersService.findAll();
      res.status(HttpStatus.OK).json(users)
    } catch (error){
      res.json(error).status(error.status);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response): Promise<User | void> {
    try {
      const user = await this.usersService.findById(id);
      if (!user) throw new NotFoundException('User not found');
      res.status(HttpStatus.OK).json(user)
    } catch (error) {
      res.json(error).status(error.status);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<User | void> {
    try {
      const { username, phone_number, email } = createUserDto;

      const existingUserByUsername = await this.usersService.findByUsername(username);
      if (existingUserByUsername) res.status(HttpStatus.CONFLICT).json({meesage: 'Conflict: Username already exists'});

      const existingUserByEmail = await this.usersService.findByEmail(email);
      if (existingUserByEmail) res.status(HttpStatus.CONFLICT).json({message: 'Conflict: E-mail already exists'});

      const existingUserByPhoneNumber = await this.usersService.findByPhoneNumber(phone_number);
      if (existingUserByPhoneNumber) res.status(HttpStatus.CONFLICT).json({message: 'Conflict: Phone number already exists'});

      const user = await this.usersService.create(createUserDto);
      res.json(user).status(HttpStatus.CREATED);
    } catch (error) {
      res.json(error).status(error.status);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response
  ): Promise<User | void> {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      if (!user) throw new NotFoundException('User not found');
      res.json(user).status(HttpStatus.OK)
    } catch (error) {
      res.json(error).status(error.status);
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