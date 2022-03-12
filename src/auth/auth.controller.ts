import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  login(): string {
    return 'access token';
  }
}
