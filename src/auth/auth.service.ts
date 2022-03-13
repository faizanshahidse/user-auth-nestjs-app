import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../models/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  register(user: User): Promise<User> {
    const newUser = this.userService.add(user);
    return newUser;
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail({ email });

    if (!user) {
      return null;
    }

    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  login(user: User): { jwtToken: string } {
    const payload = {
      email: user.email,
    };

    return {
      jwtToken: this.jwtService.sign(payload),
    };
  }
}
