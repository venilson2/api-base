import { Controller, Post, Body, Get, Param, Put, Delete, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-tenant.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<User[]> {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      res.status(error.status).json({ message: error.message, status: error.status });
    }
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    try {
      const user = await this.usersService.findById(id);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      res.status(error.status).json({ message: error.message, status: error.status });
    }
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto, 
    @Res() res: Response
  ) {
    try {
      const user = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      res.status(error.status).json({ message: error.message, status: error.status });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      if (!user) throw new NotFoundException('User not found');
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      res.status(error.status).json({ message: error.message, status: error.status });
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string, 
    @Res() res: Response
  ) {
    try {
      const user = await this.usersService.remove(id);
      if (user === 0) throw new NotFoundException('User not found');
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      res.status(error.status).json({ message: error.message, status: error.status });
    }
  }
}