import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: any[];
    constructor() {
      this.users = [
        {
          id: 1,
          username: 'john',
          password: 'changeme',
          role: 'admin',
        },
        {
          id: 2,
          username: 'maria',
          password: 'guess',
          role: 'user',
        },
      ] as User[];
    }
  async findAll(): Promise<User[]> {
    return this.users;
  }

  async create(createUserDto): Promise<User> {
    this.users.push(createUserDto);
    return createUserDto;
  }

  async findOne(username): Promise<User> {
    return this.users.find(user => user.username === username);
  }
}
