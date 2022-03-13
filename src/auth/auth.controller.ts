import { Controller, Body, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* ............. User Login API .................... */
  @Post('login')
  login(@Body() body: any): { jwtToken: string } {
    const { email, password } = body;
    return this.authService.login({ email, password });
  }
}
