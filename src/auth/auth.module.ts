import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserSchema } from '../schemas/user.schema';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.jwtSecret,
      signOptions: { expiresIn: '3600s' },
    }),
    UserModule,
  ],
  providers: [AuthResolver, AuthService, UserService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
