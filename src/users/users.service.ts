import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users: any[];
    constructor() {
        this.users = [
          {
            userId: 1,
            username: 'john',
            password: 'changeme',
            company: 'company1',
            roles: ['admin'],
          },
          {
            userId: 2,
            username: 'maria',
            password: 'guess',
            company: 'company2',
            roles: ['user'],
          },
        ];
    }

    
  async findOne(username) {
    return this.users.find(user => user.username === username);
  }
}
