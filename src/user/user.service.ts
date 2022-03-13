import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async add(user: User): Promise<User> {
    const newUser = new this.UserModel(user);
    const response = await newUser.save();
    return response;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ where: { email } });
    return user;
  }
}
