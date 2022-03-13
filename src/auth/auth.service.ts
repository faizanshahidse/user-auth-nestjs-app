import { Injectable } from '@nestjs/common';

import { User } from '../models/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  register(user: User): Promise<User> {
    const newUser = this.userService.add(user);
    return newUser;
  }

  login(user: User): { jwtToken: string } {
    const payload = {
      email: user.email,
      name: user.name,
    };

    return {
      jwtToken: 'access Token',
    };
  }
}
