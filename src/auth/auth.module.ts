import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory:(configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET')
      }),
    inject: [ConfigService]
    })
  ],
  controllers:[AuthController]
})
export class AuthModule {}
