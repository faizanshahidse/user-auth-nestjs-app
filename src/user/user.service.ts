import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async add(user: User): Promise<User> {
    const newUser = new this.UserModel(user);
    const response = await newUser.save();
    return response;
  }
}
