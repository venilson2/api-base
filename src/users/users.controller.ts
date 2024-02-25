import { Controller, Post, Body, Get, Param, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-tenant.dto';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response,) {
    try {
      const user = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      if (error instanceof UserAlreadyExistsException) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message, status: 409 });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message, status: 500 });
      }
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string, 
    @Res() res: Response
  ) {
    const removedUser = await this.usersService.remove(id);
    return res.status(HttpStatus.OK).json(removedUser);
  }
}