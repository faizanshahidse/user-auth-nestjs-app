import { Injectable } from '@nestjs/common';

import { User } from '../interfaces/user.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  register(user: User): Promise<User> {
    const newUser = this.userService.add(user);
    return newUser;
  }
}
