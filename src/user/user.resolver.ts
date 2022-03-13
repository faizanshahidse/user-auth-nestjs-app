import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User } from '../models/user.model';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserService } from './user.service';
import { UpdateUserInput } from '../dto/update-user.input-dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: User): Promise<User> {
    const { email } = user;
    console.log('User????????????????????', user);
    return this.userService.getUser(email);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  updateProfile(
    @CurrentUser() user: User,
    @Args('updateUserData') updateUserData: UpdateUserInput,
  ): Promise<User> {
    const { email } = user;
    return this.userService.updateUser(updateUserData, email);
  }
}
