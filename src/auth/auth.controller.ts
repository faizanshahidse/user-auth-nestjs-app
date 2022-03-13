import { Controller, Post, Body } from '@nestjs/common';

import { AddUserDto } from '../dto/addUserDto';
import { User } from '../interfaces/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login(): string {
    return 'access token';
  }

  @Post()
  add(@Body() addUserDto: AddUserDto): Promise<User> {
    return this.authService.register(addUserDto);
  }
}
