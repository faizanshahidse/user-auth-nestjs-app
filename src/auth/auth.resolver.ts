import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Body } from '@nestjs/common';

import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../dto/create-user-dto';
import { UserDto } from '../dto/user-dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello Pakistan 008';
  }

  /* ............. User Registration .................... */
  @Mutation(() => User)
  register(
    @Args('createUserDto') createUserDto: CreateUserInput,
  ): Promise<User> {
    return this.authService.register(createUserDto);
  }

  /* ............. User Login .................... */
  // @UseGuards(LocalAuthGuard)
  @Query(() => String)
  login(@Body() userDto: UserDto): { jwtToken: string } {
    console.log(userDto);
    return this.authService.login(userDto);
  }
}
