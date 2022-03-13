import { Controller, Body, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* ............. User Login API .................... */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() body: any): { jwtToken: string } {
    const { email, password } = body;
    return this.authService.login({ email, password });
  }
}
