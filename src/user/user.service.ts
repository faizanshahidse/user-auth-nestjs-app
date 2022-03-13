import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../models/user.model';
import { UpdateUserInput } from '../dto/update-user.input-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async add(user: User): Promise<User> {
    const newUser = new this.UserModel(user);
    const response = await newUser.save();
    return response;
  }

  public async getUserByEmail({ email }): Promise<User> {
    const user = await this.UserModel.findOne({ email });
    return user;
  }

  public async getUser(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ email });
    return user;
  }

  public async updateUser(
    updateUserData: UpdateUserInput,
    email: string,
  ): Promise<User> {
    const updatedUser = await this.UserModel.findOneAndUpdate(
      { email },
      { ...updateUserData },
      { new: true },
    );

    return updatedUser;
  }
}
