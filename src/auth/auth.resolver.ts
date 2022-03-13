import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../dto/create-user-input-dto';

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
  // @Query(() => String)
  // login(
  //   @Req() req: Request,
  //   @Args('loginUserDto') loginUserDto: LoginUserInput,
  // ): {
  //   jwtToken: string;
  // } {
  //   console.log('req.body...........', req.body);
  //   // return { jwtToken: 'token' };
  //   return this.authService.login(loginUserDto);
  // }
}
