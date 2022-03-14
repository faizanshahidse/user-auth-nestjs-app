import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly UserModel: Model<any>,
  ) {}

  register(user: User): Promise<User> {
    const newUser = this.userService.add(user);
    return newUser;
  }

  public validatePassword = async (
    user: User,
    password: string,
  ): Promise<boolean> => {
    const modelUser = new this.UserModel(user);

    const isMatch = await modelUser.validatePassword(password);

    return isMatch;
  };

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail({ email });

    if (!user) {
      return null;
    }

    const passwordIsValid = await this.validatePassword(user, password);

    // const passwordIsValid = password === user.password;
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
